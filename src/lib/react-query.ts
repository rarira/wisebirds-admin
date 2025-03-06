import { QueryKey } from "@tanstack/react-query";

export const queryKeys = {
  me: ["me"] as QueryKey,
  campaigns: (page: number, size: number) =>
    ["campaigns", { page, size }] as QueryKey,
};
