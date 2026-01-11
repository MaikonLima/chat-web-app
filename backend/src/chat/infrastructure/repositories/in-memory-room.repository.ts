import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from '../../application/ports/room-repository.port';

@Injectable()
export class InMemoryRoomRepository implements RoomRepositoryPort {
  private readonly rooms = new Set<string>();

  ensureExists(room: string) {
    this.rooms.add(room);
  }

  exists(room: string) {
    return this.rooms.has(room);
  }
}
