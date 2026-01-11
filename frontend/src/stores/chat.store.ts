import { create } from "zustand";
import { socket } from "@/lib/socket";
import { storage } from "@/lib/storage";
import type { ChatMessage } from "./chat.types";

type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

type ChatState = {
  user: string | null;
  room: string | null;

  messages: ChatMessage[];
  loadingHistory: boolean;

  connection: ConnectionState;
  initialized: boolean;

  typingUsers: string[];
  notifyTyping: () => void;

  initSocket: () => void;
  joinRoom: (displayName: string, room: string) => void;
  sendMessage: (content: string) => void;

  addStatus: (text: string) => void;
  addMessage: (msg: ChatMessage) => void;

  leave: () => void;
};

const BASE_TITLE = "Chat.io";
let unreadCount = 0;
let typingTimeout: ReturnType<typeof setTimeout> | null = null;

function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function notifyNewMessage(from: string, content: string) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;

  new Notification(`Nova mensagem de ${from}`, {
    body: content,
    icon: "/chat-icon.png",
  });
}

function updateDocumentTitle() {
  document.title =
    unreadCount > 0 ? `(${unreadCount}) ${BASE_TITLE}` : BASE_TITLE;
}

function incrementUnreadCount() {
  unreadCount++;
  updateDocumentTitle();
}

function resetUnreadCount() {
  unreadCount = 0;
  updateDocumentTitle();
}

function emitTypingStart(room: string, user: string) {
  socket.emit("typing:start", { room, user });
}

function emitTypingStop(room: string, user: string) {
  socket.emit("typing:stop", { room, user });
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    resetUnreadCount();
  }
});

export const useChatStore = create<ChatState>((set, get) => ({
  user: storage.getUser(),
  room: storage.getRoom(),

  messages: [],
  typingUsers: [],

  loadingHistory: false,

  connection: "idle",
  initialized: false,

  initSocket() {
    if (get().initialized) return;

    set({ initialized: true });

    requestNotificationPermission();
    updateDocumentTitle();

    socket.on("connect", () => set({ connection: "connected" }));

    socket.io.on("reconnect_attempt", () =>
      set({ connection: "reconnecting" })
    );

    socket.on("disconnect", () => set({ connection: "disconnected" }));

    socket.on("chat:history", (history: ChatMessage[]) => {
      set({ messages: history ?? [], loadingHistory: false });
      resetUnreadCount();
    });

    socket.on("chat:message", (msg: ChatMessage) => {
      get().addMessage(msg);

      if (msg.fromName && msg.fromName !== get().user) {
        notifyNewMessage(msg.fromName, msg.content);

        if (document.visibilityState === "hidden") {
          incrementUnreadCount();
        }
      }
    });

    socket.on("chat:status", (text: string) => {
      get().addStatus(text);
    });

    socket.on("typing:start", (user: string) => {
      set((state) =>
        state.typingUsers.includes(user)
          ? state
          : { typingUsers: [...state.typingUsers, user] }
      );
    });

    socket.on("typing:stop", (user: string) => {
      set((state) => ({
        typingUsers: state.typingUsers.filter((u) => u !== user),
      }));
    });
  },

  joinRoom(displayName, room) {
    const name = displayName.trim();
    const rm = room.trim();

    if (!name || !rm) return;

    storage.setUser(name);
    storage.setRoom(rm);

    resetUnreadCount();

    set({
      user: name,
      room: rm,
      messages: [],
      typingUsers: [],
      loadingHistory: true,
      connection: socket.connected ? "connected" : "connecting",
    });

    get().initSocket();

    if (!socket.connected) socket.connect();

    socket.emit("room:join", { displayName: name, room: rm });
  },

  sendMessage(content) {
    const { room, user } = get();
    if (!room || !user) return;

    const text = content.trim();
    if (!text) return;

    socket.emit("chat:send", { room, content: text });

    emitTypingStop(room, user);
  },

  notifyTyping() {
    const { room, user } = get();
    if (!room || !user) return;

    emitTypingStart(room, user);

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      emitTypingStop(room, user);
      typingTimeout = null;
    }, 1500);
  },

  addStatus(text) {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      type: "status",
      content: text,
      fromName: "",
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ messages: [...state.messages, msg] }));
  },

  addMessage(msg) {
    set((state) => {
      if (state.messages.some((m) => m.id === msg.id)) {
        return state;
      }

      return { messages: [...state.messages, msg] };
    });
  },

  leave() {
    const { room, user } = get();

    if (room && user) {
      emitTypingStop(room, user);
    }

    try {
      socket.disconnect();
    } catch {}

    storage.clearChatSession();
    resetUnreadCount();

    set({
      user: null,
      room: null,
      messages: [],
      typingUsers: [],
      loadingHistory: false,
      connection: "idle",
      initialized: false,
    });
  },
}));
