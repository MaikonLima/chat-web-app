const KEY_USER = "chat:user";
const KEY_ROOM = "chat:room";

export const storage = {
  
  getUser(): string | null {
    return sessionStorage.getItem(KEY_USER);
  },
  
  setUser(name: string) {
    sessionStorage.setItem(KEY_USER, name);
  },
  
  removeUser() {
    sessionStorage.removeItem(KEY_USER);
  },

  getRoom(): string | null {
    return sessionStorage.getItem(KEY_ROOM);
  },

  setRoom(room: string) {
    sessionStorage.setItem(KEY_ROOM, room);
  },
  
  removeRoom() {
    sessionStorage.removeItem(KEY_ROOM);
  },

  clearChatSession() {
    sessionStorage.removeItem(KEY_USER);
    sessionStorage.removeItem(KEY_ROOM);
  },
};
