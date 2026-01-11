import { Inject, Injectable } from '@nestjs/common';
import type { MessageRepositoryPort } from '../ports/message-repository.port';
import type { PresenceRepositoryPort } from '../ports/presence-repository.port';
import { Message } from '../../domain/entities/message.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject('MessageRepositoryPort')
    private readonly messages: MessageRepositoryPort,
    @Inject('PresenceRepositoryPort')
    private readonly presence: PresenceRepositoryPort,
  ) {}

  execute(input: { room: string; userId: string; content: string }) {
    const user = this.presence.get(input.room, input.userId);
    if (!user) throw new Error('Usuário não está presente na sala.');

    const msg = new Message(
      randomUUID(),
      input.room,
      user.id,
      user.displayName,
      input.content,
      new Date(),
      'message',
    );

    this.messages.add(msg);
    return msg;
  }
}
