import { PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { useErrorStore } from "@/lib/stores";
import { CampaignApiResponse } from "@/lib/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useUpdateCampaignStatus(id: number) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const setError = useErrorStore((state) => state.setError);

  const campaignsQueryKey = queryKeys.campaigns.lists(
    pageParams ? +pageParams : 0,
    PAGINATION_SIZE
  );

  const { mutateAsync, error } = useMutation({
    mutationFn: async (enabled: boolean) => {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "사용자 업데이트 실패");
      }
    },
    onMutate: async (enabled: boolean) => {
      await queryClient.cancelQueries({
        queryKey: campaignsQueryKey,
      });
      const previousCampaigns =
        queryClient.getQueryData<CampaignApiResponse>(campaignsQueryKey);

      queryClient.setQueryData<CampaignApiResponse>(
        campaignsQueryKey,
        (old) => {
          return {
            ...old!,
            content: old!.content.map((campaign) =>
              campaign.id === id ? { ...campaign, enabled } : campaign
            ),
          };
        }
      );

      return { previousCampaigns };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(campaignsQueryKey, context?.previousCampaigns);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: campaignsQueryKey,
        exact: true,
      });
    },
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  const handleChange = async (value: boolean) => {
    await mutateAsync(value);
  };

  return { handleChange };
}
