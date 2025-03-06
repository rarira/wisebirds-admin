"use client";

import DataTable from "@/components/custom/data-table";
import Pagination from "@/components/custom/pagination";
import { CAMPAIGN_TABLE_HEADERS, PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { useErrorStore, useRoleStore } from "@/lib/store";
import { CampaignApiResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function HomeView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pageParam = params.get("page");

  const page = pageParam ? +pageParam : 0;

  const role = useRoleStore((state) => state.role);
  const setError = useErrorStore((state) => state.setError);

  const { data, isLoading, error } = useQuery<CampaignApiResponse>({
    queryKey: queryKeys.campaigns(page, PAGINATION_SIZE),
    queryFn: async () => {
      const response = await fetch(
        `/api/campaigns?page=${page}&size=${PAGINATION_SIZE}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "요청 실패");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 5,
  });

  const setPageParam = (page: number) => {
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { content, ...restData } = data;

  return (
    <>
      <h2 className="font-bold">캠페인 관리</h2>
      <DataTable
        headers={CAMPAIGN_TABLE_HEADERS}
        data={content}
        editable={role !== "viewer"}
      />
      <div className="flex flex-col w-full" />
      {restData.total_pages > 1 && (
        <Pagination pageInfo={restData} setPage={setPageParam} />
      )}
    </>
  );
}

export default HomeView;
