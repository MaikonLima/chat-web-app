import { Injectable } from '@nestjs/common';
import { MessageRepositoryPort } from '../../application/ports/message-repository.port';
import { Message } from '../../domain/entities/message.entity';

@Injectable()
export class InMemoryMessageRepository implements MessageRepositoryPort {
  private readonly byRoom = new Map<string, Message[]>();

  add(message: Message) {
    if (!this.byRoom.has(message.room)) this.byRoom.set(message.room, []);
    this.byRoom.get(message.room)!.push(message);
  }

  listByRoom(room: string, limit = 50): Message[] {
    const list = this.byRoom.get(room) ?? [];
    return list.slice(Math.max(0, list.length - limit));
  }
}
