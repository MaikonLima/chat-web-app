import { User } from '../../domain/entities/user.entity';

export interface PresenceRepositoryPort {
  upsert(room: string, user: User): void;
  remove(room: string, userId: string): User | null;
  get(room: string, userId: string): User | null;
  list(room: string): User[];
}
