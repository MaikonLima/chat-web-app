import { Inject, Injectable } from '@nestjs/common';
import type { PresenceRepositoryPort } from '../ports/presence-repository.port';

@Injectable()
export class LeaveRoomUseCase {
  constructor(
    @Inject('PresenceRepositoryPort')
    private readonly presence: PresenceRepositoryPort,
  ) {}

  execute(input: { room: string; userId: string }) {
    return this.presence.remove(input.room, input.userId);
  }
}
