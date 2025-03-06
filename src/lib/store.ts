import { create } from "zustand";
import { ROLES } from "./constants";

type RoleStore = {
  role: keyof typeof ROLES;
  setRole: (role: keyof typeof ROLES) => void;
};

type ErrorStore = {
  error: Error | null;
  setError: (error: Error | null) => void;
};

export const useRoleStore = create<RoleStore>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
