export type ChatMessage = {
  id: string;
  room?: string;
  fromUserId?: string;
  fromName: string;
  content: string;
  createdAt: string;
  type: "message" | "status";
};

export type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

export type PropsLoginPage = {
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export type PropsChatPage = {
  header?: React.ReactNode;
  messages?: React.ReactNode;
  input?: React.ReactNode;
};

export type PropsJoinRoonForm = {
    onJoin: (displayName: string, room: string) => void;
    defaultName?: string;
    defaultRoom?: string;
    loading?: boolean;
};
