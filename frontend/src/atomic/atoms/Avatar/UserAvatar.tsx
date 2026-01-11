import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 70%, 45%)`;
}

export function UserAvatar({ name }: { name: string }) {
  const color = stringToColor(name || 'U');
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: color }}>
        {(name?.[0] ?? 'U').toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
