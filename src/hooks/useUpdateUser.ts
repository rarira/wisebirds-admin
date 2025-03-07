import { PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { useErrorStore } from "@/lib/store";
import { UserApiResponse } from "@/lib/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const setError = useErrorStore((state) => state.setError);

  const userQueryKey = queryKeys.users(
    pageParams ? +pageParams : 0,
    PAGINATION_SIZE
  );

  const { mutateAsync, error } = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "사용자 업데이트 실패");
      }
    },
    onMutate: async (name: string) => {
      await queryClient.cancelQueries({
        queryKey: userQueryKey,
      });
      const previousCampaigns =
        queryClient.getQueryData<UserApiResponse>(userQueryKey);

      queryClient.setQueryData<UserApiResponse>(userQueryKey, (old) => {
        return {
          ...old!,
          content: old!.content.map((user) =>
            user.id === id ? { ...user, name } : user
          ),
        };
      });

      return { previousCampaigns };
    },
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  const handleSubmit = async (name: string) => {
    await mutateAsync(name);
  };

  return { handleSubmit };
}
