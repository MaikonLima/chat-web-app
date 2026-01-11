import { LoginTemplate } from '@/atomic/templates/LoginTemplate';
import { LoginCard } from '@/atomic/organisms/Login/LoginCard';
import { useChatStore } from '@/stores/chat.store';

export function LoginPage() {
    const user = useChatStore(s => s.user);
    const room = useChatStore(s => s.room);
    const joinRoom = useChatStore(s => s.joinRoom);
    const loading = useChatStore(s => s.loadingHistory);

    return (
        <LoginTemplate
            content={
                <LoginCard
                    onJoin={joinRoom}
                    name={user ?? ''}
                    room={room ?? ''}
                    loading={loading}
                />
            }
            footer={<span>Abra outra aba do navegador para simular outro usuário.</span>}
        />
    );
}
