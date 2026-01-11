import { formatTime } from '@/lib/date';

export function Timestamp({ date }: { date: string }) {
  return <span className="text-xs text-muted-foreground">{formatTime(date)}</span>;
}
