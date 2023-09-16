import { Server } from "socket.io";

import { Inject, Logger, UseGuards } from "@nestjs/common";
import { PositionData } from "./types/gateway.types";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { DeviceService } from "@/device/services";
import { DEVICE_SERVICE } from "@/device/constants";
import { WsGuard } from "./guards/connection.guard";

@WebSocketGateway({ maxHttpBufferSize: 1e9 })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ClientGateway.name);
  @WebSocketServer()
  private readonly server: Server;
  @Inject(DEVICE_SERVICE)
  private readonly deviceService: DeviceService;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      this.logger.log(
        `Connected for sending data to client on socket: ${socket.id}`
      );
    });
  }

  async handleConnection(client: any) {
    const { deviceId } = this.getHandshakeHeaders(client);
    const isUpdated = await this.deviceService.updateDevice(deviceId, {
      isConnected: true,
    });
    if (isUpdated) this.logger.log(`Client connected with server`);
  }

  async handleDisconnect(client: any) {
    const { deviceId } = this.getHandshakeHeaders(client);
    if (!deviceId) return;
    await this.deviceService.softDelete(deviceId);
    this.logger.log(`Client disconnected from server`);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("position")
  onPosition(
    @MessageBody() data: { position: PositionData },
    @ConnectedSocket() socket: any
  ) {
    const { deviceId } = this.getHeaders(socket);
    this.deviceService.updateDevice(deviceId, data.position);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("stream")
  async onData(@MessageBody() data, @ConnectedSocket() socket: any) {
    const { deviceId, secret } = this.getHeaders(socket);
    const devices = await this.deviceService.findDevicesToConnect(secret);
    if (!devices) {
      return;
    }
    const device = devices.find(
      (device) => device.deviceId !== deviceId && device.isConnected
    );
    if (!device) return;
    this.server.emit(`onStream:${device.deviceId}`, { content: data });
  }

  private getHeaders(socket: any) {
    return {
      deviceId: socket.client.request.headers.deviceid,
      secret: socket.client.request.headers.secret,
    };
  }

  private getHandshakeHeaders(socket: any) {
    return {
      deviceId: socket.handshake.headers.deviceid,
      secret: socket.handshake.headers.secret,
    };
  }

  @UseGuards(WsGuard)
  @SubscribeMessage("control")
  async onControl(@MessageBody() data: any, @ConnectedSocket() socket: any) {
    const { deviceId, secret } = this.getHeaders(socket);
    const devices = await this.deviceService.findDevicesToConnect(secret);
    if (!devices) {
      return;
    }
    const device = devices.find(
      (device) => device.deviceId !== deviceId && device.isConnected
    );
    if (!device) {
      return;
    }
    this.server.emit(`onControl:${device.deviceId}`, {
      content: data,
    });
  }
}
