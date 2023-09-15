import { Server } from "socket.io";

import { Inject, Logger } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PositionData } from "./types/gateway.types";
import { IDeviceService } from "@/device/services";
import { DEVICE_SERVICE } from "@/device/constants";

@WebSocketGateway()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ClientGateway.name);
  @WebSocketServer()
  private readonly server: Server;
  constructor(
    @Inject(DEVICE_SERVICE)
    private readonly deviceService: IDeviceService
  ) {}

  onModuleInit() {
    this.server.on("connection", (socket) => {
      this.logger.log(`Connected to client on socket: ${socket.id}`);
    });
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected with server`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected from server`);
  }

  @SubscribeMessage("stream")
  onData(@MessageBody() data) {
    this.server.emit("onStream", { content: data });
  }

  @SubscribeMessage("position")
  onPosition(
    @MessageBody() data: { position: PositionData; deviceId: string }
  ) {
    this.deviceService.updateDevice(data.deviceId, data.position);
  }
}
