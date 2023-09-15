import { Server } from 'socket.io';

import { Logger } from '@nestjs/common';
import {
    MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect{
  private readonly logger = new Logger(ClientGateway.name);
  @WebSocketServer()
  private readonly server: Server;

  onModuleInit(){
    this.server.on('connection', (socket) => {
      this.logger.log(`Connected for sending data to client on socket: ${socket.id}`);
    })
  }


   handleConnection(client: any) {
    this.logger.log(`Client connected with server`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected from server`);
  }


  @SubscribeMessage('data')
  onData(@MessageBody() data) {
    console.log(data);
    this.server.emit('onData', { message: 'hey!', body: data})
  }


}