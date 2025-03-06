import { PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { CampaignApiResponse } from "@/lib/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useUpdateCampaignStatus(id: number) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const campaignsQueryKey = queryKeys.campaigns(
    pageParams ? +pageParams : 0,
    PAGINATION_SIZE
  );

  const { mutateAsync } = useMutation({
    mutationFn: async (enabled: boolean) => {
      fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled,
        }),
      });
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
  });

  const handleChange = async (value: boolean) => {
    await mutateAsync(value);
  };

  return { handleChange };
}
