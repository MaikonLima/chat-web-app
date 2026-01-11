export interface RoomRepositoryPort {
  ensureExists(room: string): void;
  exists(room: string): boolean;
}
