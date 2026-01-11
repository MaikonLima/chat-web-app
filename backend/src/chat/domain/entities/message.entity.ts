export class Message {
  constructor(
    public readonly id: string,
    public readonly room: string,
    public readonly fromUserId: string,
    public readonly fromName: string,
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly type: 'message' | 'status' = 'message',
  ) {}
}
