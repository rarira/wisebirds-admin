"use client";
import DataTable from "@/components/custom/data-table";
import Pagination from "@/components/custom/pagination";
import { CAMPAIGN_TABLE_HEADERS, PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { useRoleStore } from "@/lib/store";
import { CampaignApiResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);

  const role = useRoleStore((state) => state.role);

  const { data, error, isLoading } = useQuery<CampaignApiResponse>({
    queryKey: queryKeys.campaigns(page, PAGINATION_SIZE),
    queryFn: async () => {
      const response = await fetch(
        `/api/campaigns?page=${page}&size=${PAGINATION_SIZE}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { content, ...restData } = data;

  return (
    <div className="flex flex-1 flex-col justify-between mt-4 gap-4">
      <DataTable
        headers={CAMPAIGN_TABLE_HEADERS}
        data={content}
        editable={role !== "viewer"}
      />
      <div className="flex flex-col w-full" />
      {restData.total_pages > 1 && (
        <Pagination pageInfo={restData} setPage={setPage} />
      )}
    </div>
  );
}
