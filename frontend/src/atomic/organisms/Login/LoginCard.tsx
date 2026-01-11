import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JoinRoomForm } from '@/atomic/molecules/JoinRoomForm/JoinRoomForm';
import { ThemeToggle } from '@/atomic/atoms/ThemeToggle/ThemeToggle';


type PropsLoginCard = {
  onJoin: (displayName: string, room: string) => void;
  name?: string;
  room?: string;
  loading?: boolean;
}

export function LoginCard({
  onJoin,
  name,
  room,
  loading,
}: PropsLoginCard) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-center">Chat.io</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Informe seu nome e uma sala.
        </p>
      </CardHeader>

      <CardContent>
        <JoinRoomForm
          onJoin={onJoin}
          defaultName={name}
          defaultRoom={room}
          loading={loading}
        />
      </CardContent>
      <div className='flex justify-center'>
        <ThemeToggle variant={'outline'} />
      </div>
    </Card>
  );
}
