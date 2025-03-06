import { create } from "zustand";
import { ROLES } from "./constants";

type RoleStore = {
  role: keyof typeof ROLES;
  setRole: (role: keyof typeof ROLES) => void;
};

export const useRoleStore = create<RoleStore>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
