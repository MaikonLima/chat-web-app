import { ChatTemplate } from '@/atomic/templates/ChatTemplate';
import { ChatHeader } from '@/atomic/organisms/Chat/ChatHeader';
import { MessageList } from '@/atomic/organisms/Chat/MessageList';
import { MessageInput } from '@/atomic/molecules/MessageInput/MessageInput';
import { TypingIndicator } from '@/atomic/molecules/TypingIndicator/TypingIndicator';
import { useChatStore } from '@/stores/chat.store';
import type { ConnectionState } from '@/stores/chat.types';

export function ChatPage() {
    const user = useChatStore((s) => s.user)!;
    const room = useChatStore((s) => s.room)!;

    const messages = useChatStore((s) => s.messages);
    const typingUsers = useChatStore((s) => s.typingUsers);

    const loading = useChatStore((s) => s.loadingHistory);
    const connection = useChatStore((s) => s.connection) as ConnectionState;

    const sendMessage = useChatStore((s) => s.sendMessage);
    const notifyTyping = useChatStore((s) => s.notifyTyping);
    const leave = useChatStore((s) => s.leave);

    const inputDisabled = connection !== 'connected';

    return (
        <ChatTemplate
            header={
                <ChatHeader
                    room={room}
                    user={user}
                    connection={connection}
                    onLeave={leave}
                />
            }
            messages={
                <MessageList
                    messages={messages}
                    loading={loading}
                    currentUserName={user}
                />
            }
            input={
                <>
                    <TypingIndicator users={typingUsers} />
                    <MessageInput
                        onSend={sendMessage}
                        onTyping={notifyTyping}
                        disabled={inputDisabled}
                    />
                </>
            }
        />
    );
}
