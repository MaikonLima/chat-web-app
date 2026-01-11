import { useEffect, useRef } from 'react';
import { LoadingSkeleton } from '@/atomic/atoms/Feedback/LoadingSkeleton';
import { MessageItem } from '@/atomic/molecules/Message/MessageItem';
import type { ChatMessage } from '@/stores/chat.types';

export function MessageList({
    messages,
    loading,
    currentUserName,
}: {
    messages: ChatMessage[];
    loading: boolean;
    currentUserName: string;
}) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

    if (loading) return <LoadingSkeleton />;

    return (
        <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {messages.map(m => (
                <MessageItem
                    key={m.id}
                    message={m}
                    isMine={m.type === 'message' && m.fromName === currentUserName}
                />
            ))}
            <div ref={endRef} />
        </div>
    );
}
