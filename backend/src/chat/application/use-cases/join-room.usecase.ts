import { Inject, Injectable } from '@nestjs/common';
import type { RoomRepositoryPort } from '../ports/room-repository.port';
import type { PresenceRepositoryPort } from '../ports/presence-repository.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject('RoomRepositoryPort') private readonly rooms: RoomRepositoryPort,
    @Inject('PresenceRepositoryPort')
    private readonly presence: PresenceRepositoryPort,
  ) {}

  execute(input: { room: string; userId: string; displayName: string }) {
    this.rooms.ensureExists(input.room);
    const user = new User(input.userId, input.displayName);
    this.presence.upsert(input.room, user);
    return user;
  }
}
