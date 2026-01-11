import { UserAvatar } from '@/atomic/atoms/Avatar/UserAvatar';
import { Timestamp } from '@/atomic/atoms/Text/Timestamp';
import type { ChatMessage } from '@/stores/chat.types';

export function MessageItem({ message, isMine }: { message: ChatMessage; isMine: boolean }) {
  if (message.type === 'status') {
    return (
      <div className="text-center text-xs italic text-muted-foreground">
        {message.content}
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && <UserAvatar name={message.fromName} />}

      <div className={`max-w-[75%] space-y-1 ${isMine ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center gap-2 text-sm ${isMine ? 'justify-end' : 'justify-start'}`}>
          {!isMine && <strong>{message.fromName}</strong>}
          <Timestamp date={message.createdAt} />
        </div>

        <div className={`rounded-xl px-3 py-2 text-sm ${isMine ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          {message.content}
        </div>
      </div>

      {isMine && <UserAvatar name={message.fromName || 'Você'} />}
    </div>
  );
}
