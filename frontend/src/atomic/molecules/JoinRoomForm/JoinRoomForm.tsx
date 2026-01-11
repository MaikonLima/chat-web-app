import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PropsJoinRoonForm } from '@/stores/chat.types';


export function JoinRoomForm({ onJoin, defaultName = '', defaultRoom = 'geral', loading = false }: PropsJoinRoonForm) {
    const [displayName, setDisplayName] = useState(defaultName);
    const [room, setRoom] = useState(defaultRoom);

    const canSubmit = useMemo(
        () => displayName.trim().length > 0 && room.trim().length > 0,
        [displayName, room],
    );

    function submit() {
        if (!canSubmit || loading) return;
        onJoin(displayName, room);
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Nome</label>
                <Input
                    placeholder="Seu nome de exibição"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    disabled={loading}
                    autoFocus
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Sala</label>
                <Input
                    placeholder="ex: geral"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                    disabled={loading}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                />
            </div>

            <Button className="w-full hover:cursor-pointer" onClick={submit} disabled={!canSubmit || loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </Button>
        </div>
    );
}
