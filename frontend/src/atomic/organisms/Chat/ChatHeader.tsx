import { Button } from '@/components/ui/button';
import { ArrowRightFromLine } from 'lucide-react';
import type { ConnectionState } from '@/stores/chat.types';
import { ThemeToggle } from '@/atomic/atoms/ThemeToggle/ThemeToggle';
import { ConfirmDialog } from '@/atomic/atoms/Dialog/ConfirmDialog';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const labelByState: Record<ConnectionState, string> = {
    idle: 'Offline',
    connecting: 'Conectando…',
    connected: 'Online',
    disconnected: 'Desconectado',
    reconnecting: 'Reconectando…',
};

const badgeVariantByState: Record<
    ConnectionState,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    idle: 'outline',
    connecting: 'secondary',
    connected: 'default',
    disconnected: 'destructive',
    reconnecting: 'secondary',
};

type PropsChatHeader = {
    room: string;
    user: string;
    connection: ConnectionState;
    onLeave: () => void;
};

export function ChatHeader({
    room,
    user,
    connection,
    onLeave,
}: PropsChatHeader) {
    return (
        <AlertDialog>
            <header className="p-4 border-b flex items-center justify-between">
                <div className="space-y-0.5">
                    <div className="font-semibold">Sala: {room}</div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-sm">{user}</span>
                        <Badge variant={badgeVariantByState[connection]}>
                            {labelByState[connection]}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hover:cursor-pointer"
                        >
                            Sair
                            <ArrowRightFromLine className="ml-2 h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                </div>
            </header>

            <ConfirmDialog
                title="Sair da sala?"
                description={
                    <>
                        Você será desconectado da sala <strong>{room}</strong>.
                        <br />
                        Para voltar, será necessário entrar novamente.
                    </>
                }
                confirmLabel="Sair"
                cancelLabel="Cancelar"
                onConfirm={onLeave}
            />
        </AlertDialog>
    );
}
