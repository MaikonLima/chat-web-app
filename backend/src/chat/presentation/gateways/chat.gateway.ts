import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from '../../application/dtos/join-room.dto';
import { SendMessageDto } from '../../application/dtos/send-message.dto';
import { JoinRoomUseCase } from '../../application/use-cases/join-room.usecase';
import { LeaveRoomUseCase } from '../../application/use-cases/leave-room.usecase';
import { SendMessageUseCase } from '../../application/use-cases/send-message.usecase';
import { Inject } from '@nestjs/common';
import type { MessageRepositoryPort } from '../../application/ports/message-repository.port';
import { AppLogger } from '../../../shared/logger/logger.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly socketRoom = new Map<string, string>();

  constructor(
    private readonly joinRoom: JoinRoomUseCase,
    private readonly leaveRoom: LeaveRoomUseCase,
    private readonly sendMessage: SendMessageUseCase,
    @Inject('MessageRepositoryPort')
    private readonly messagesRepo: MessageRepositoryPort,
    private readonly logger: AppLogger,
  ) {}

  @SubscribeMessage('room:join')
  async onJoin(
    @MessageBody() dto: JoinRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const prevRoom = this.socketRoom.get(socket.id);
    if (prevRoom) {
      socket.leave(prevRoom);
      const user = this.leaveRoom.execute({
        room: prevRoom,
        userId: socket.id,
      });
      if (user)
        this.server
          .to(prevRoom)
          .emit('chat:status', `${user.displayName} saiu da sala`);
    }

    const user = this.joinRoom.execute({
      room: dto.room,
      userId: socket.id,
      displayName: dto.displayName,
    });

    socket.join(dto.room);
    this.socketRoom.set(socket.id, dto.room);

    this.logger.log('User joined room', {
      socketId: socket.id,
      room: dto.room,
      name: dto.displayName,
    });

    this.server
      .to(dto.room)
      .emit('chat:status', `${user.displayName} entrou na sala`);

    const history = this.messagesRepo.listByRoom(dto.room, 50);
    socket.emit('chat:history', history);

    return { ok: true, room: dto.room };
  }

  @SubscribeMessage('chat:send')
  async onSend(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const currentRoom = this.socketRoom.get(socket.id);
    if (!currentRoom || currentRoom !== dto.room) {
      return { ok: false, error: 'Você não está nessa sala.' };
    }

    const msg = this.sendMessage.execute({
      room: dto.room,
      userId: socket.id,
      content: dto.content,
    });

    this.server.to(dto.room).emit('chat:message', msg);
    return { ok: true };
  }

  async handleDisconnect(socket: Socket) {
    const room = this.socketRoom.get(socket.id);
    if (!room) return;

    const user = this.leaveRoom.execute({ room, userId: socket.id });
    socket.leave(room);
    this.socketRoom.delete(socket.id);

    if (user) {
      this.server.to(room).emit('typing:stop', user.displayName);
      this.logger.warn('User disconnected', {
        socketId: socket.id,
        room,
        name: user.displayName,
      });
      this.server
        .to(room)
        .emit('chat:status', `${user.displayName} saiu da sala`);
    }
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @MessageBody() data: { room: string; user: string },
    @ConnectedSocket() client: Socket,
  ) {
    const currentRoom = this.socketRoom.get(client.id);
    if (!currentRoom || currentRoom !== data.room) return;

    client.to(data.room).emit('typing:start', data.user);
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @MessageBody() data: { room: string; user: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.room).emit('typing:stop', data.user);
  }
}
