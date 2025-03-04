import { create } from "zustand";
import { Roles } from "./constants";

type RoleStore = {
  role: keyof typeof Roles;
  setRole: (role: keyof typeof Roles) => void;
};

export const useRoleStore = create<RoleStore>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
