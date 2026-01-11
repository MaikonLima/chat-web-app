import { useEffect } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { ChatPage } from '@/pages/ChatPage';
import { useChatStore } from '@/stores/chat.store';

export default function App() {
  const user = useChatStore(s => s.user);
  const room = useChatStore(s => s.room);
  const initSocket = useChatStore(s => s.initSocket);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (!user || !room) return <LoginPage />;
  return <ChatPage />;
}
