import { create } from "zustand";
import type { User, SortField, SortDirection, UserRole } from "../types/user";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: string, updates: Partial<Omit<User, "id">>) => void;
  addUser: (user: Omit<User, "id">) => string;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
  addUser: (user) => {
    const id = crypto.randomUUID();
    const newUser: User = { ...user, id };
    set((state) => ({ users: [newUser, ...state.users] }));
    return id;
  },
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));

export type { User, SortField, SortDirection, UserRole };
