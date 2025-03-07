"use client";

import { queryKeys } from "@/lib/react-query";
import { UserProfile } from "@/lib/types";
import { GrUserManager } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoadingSpinner from "../loading-spinner";

function HeaderProfile() {
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1">
        <GrUserManager />
        {isLoading ? (
          <span>
            <LoadingSpinner color="white" size={8} />
          </span>
        ) : error ? (
          <span>Error: {error.message}</span>
        ) : data ? (
          <span className="flex">{data.email}</span>
        ) : null}
      </PopoverTrigger>
      {data && (
        <PopoverContent className="flex mt-4 flex-col items-center w-full">
          <div className="font-semibold text-lg mb-1">{data.name}</div>
          <div>{data.email}</div>
          <div>{data.company.name}</div>
        </PopoverContent>
      )}
    </Popover>
  );
}

export default HeaderProfile;
