import { Module } from '@nestjs/common';
import { ChatGateway } from './presentation/gateways/chat.gateway';
import { JoinRoomUseCase } from './application/use-cases/join-room.usecase';
import { LeaveRoomUseCase } from './application/use-cases/leave-room.usecase';
import { SendMessageUseCase } from './application/use-cases/send-message.usecase';
import { InMemoryRoomRepository } from './infrastructure/repositories/in-memory-room.repository';
import { InMemoryPresenceRepository } from './infrastructure/repositories/in-memory-presence.repository';
import { InMemoryMessageRepository } from './infrastructure/repositories/in-memory-message.repository';

@Module({
  providers: [
    ChatGateway,

    JoinRoomUseCase,
    LeaveRoomUseCase,
    SendMessageUseCase,

    { provide: 'RoomRepositoryPort', useClass: InMemoryRoomRepository },
    { provide: 'PresenceRepositoryPort', useClass: InMemoryPresenceRepository },
    { provide: 'MessageRepositoryPort', useClass: InMemoryMessageRepository },
  ],
})
export class ChatModule {}
