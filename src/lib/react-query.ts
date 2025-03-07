import { QueryKey } from "@tanstack/react-query";

export const queryKeys = {
  me: ["me"] as QueryKey,
  campaigns: {
    lists: (page: number, size: number) =>
      ["campaigns", { page, size }] as QueryKey,
  },
  users: {
    lists: (page: number, size: number) =>
      ["users", { page, size }] as QueryKey,
  },
};
