import { Injectable } from '@nestjs/common';
import { PresenceRepositoryPort } from '../../application/ports/presence-repository.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class InMemoryPresenceRepository implements PresenceRepositoryPort {
  private readonly map = new Map<string, Map<string, User>>();

  upsert(room: string, user: User) {
    if (!this.map.has(room)) this.map.set(room, new Map());
    this.map.get(room)!.set(user.id, user);
  }

  remove(room: string, userId: string): User | null {
    const rm = this.map.get(room);
    if (!rm) return null;
    const user = rm.get(userId) ?? null;
    rm.delete(userId);
    return user;
  }

  get(room: string, userId: string): User | null {
    return this.map.get(room)?.get(userId) ?? null;
  }

  list(room: string): User[] {
    return [...(this.map.get(room)?.values() ?? [])];
  }
}
