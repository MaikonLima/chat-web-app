import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    onSend: (value: string) => void;
    onTyping?: () => void;
    disabled?: boolean;
};

export function MessageInput({ onSend, onTyping, disabled }: Props) {
    const [text, setText] = useState('');

    function send() {
        if (!text.trim()) return;
        onSend(text);
        setText('');
    }

    return (
        <div className="flex gap-2 p-4 border-t">
            <Input
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    onTyping?.();
                }}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Digite sua mensagem..."
                disabled={disabled}
            />
            <Button onClick={send} disabled={disabled}>
                Enviar
            </Button>
        </div>
    );
}
