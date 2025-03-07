import { PAGINATION_SIZE } from "@/lib/constants";
import { userAddFormSchema } from "@/lib/forms";
import { queryKeys } from "@/lib/react-query";
import { useErrorStore } from "@/lib/stores";
import { PageInfo, UserApiResponse } from "@/lib/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

type UserAddFormData = z.infer<typeof userAddFormSchema>;

export function useAddUser() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const setError = useErrorStore((state) => state.setError);

  const userQueryKey = queryKeys.users.lists(
    pageParams ? +pageParams : 0,
    PAGINATION_SIZE
  );

  const { mutateAsync, error } = useMutation({
    mutationFn: async (data: UserAddFormData) => {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "사용자 생성 실패");
      }
    },
    onMutate: async (data: UserAddFormData) => {
      await queryClient.cancelQueries({
        queryKey: userQueryKey,
      });
      const previousUsers =
        queryClient.getQueryData<UserApiResponse>(userQueryKey);

      queryClient.setQueryData<UserApiResponse>(userQueryKey, (old) => {
        const total_elements = old!.total_elements + 1;
        const total_pages = Math.ceil(total_elements / PAGINATION_SIZE);
        const last = !!pageParams ? +pageParams === total_pages - 1 : false;

        const updatedPageInfo: Partial<PageInfo> = {
          total_elements,
          total_pages,
          last,
          number_of_elements: last
            ? old!.number_of_elements + 1
            : old!.number_of_elements,
        };

        if (!!pageParams && +pageParams > 0) {
          return {
            ...old!,
            ...updatedPageInfo,
          };
        }

        old!.content.unshift({
          id: old!.content[0].id + 1,
          ...data,
          last_login_at: new Date().toISOString(),
        });

        return {
          ...old!,
          content: old!.content.slice(0, PAGINATION_SIZE),
          ...updatedPageInfo,
        };
      });

      return { previousUsers };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(userQueryKey, context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  const handleSubmit = async (data: UserAddFormData) => {
    await mutateAsync(data);
  };

  return { handleSubmit };
}
