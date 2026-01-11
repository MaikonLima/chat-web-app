import { Message } from '../../domain/entities/message.entity';

export interface MessageRepositoryPort {
  add(message: Message): void;
  listByRoom(room: string, limit?: number): Message[];
}
