"use client";

import DataTable from "@/components/custom/data-table";
import Pagination from "@/components/custom/pagination";
import { PAGINATION_SIZE } from "@/lib/constants";
import { queryKeys } from "@/lib/react-query";
import { useErrorStore } from "@/lib/store";
import {
  ResourceApiResponseMap,
  ResourceContentTypeMap,
  TableHeader,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "@/components/custom/loading-spinner";

type PaginatedTableViewProps = {
  resourceType: keyof ResourceContentTypeMap;
  tableHeaders: TableHeader[];
  pageTitle: string;
  dataEditable?: boolean;
};

function PaginatedTableView({
  resourceType,
  tableHeaders,
  pageTitle,
  dataEditable,
}: PaginatedTableViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pageParam = params.get("page");

  const page = pageParam ? +pageParam : 0;

  const setError = useErrorStore((state) => state.setError);

  const { data, isLoading, error } = useQuery<
    ResourceApiResponseMap[typeof resourceType]
  >({
    queryKey: queryKeys[resourceType](page, PAGINATION_SIZE),
    queryFn: async () => {
      const response = await fetch(
        `/api/${resourceType}?page=${page}&size=${PAGINATION_SIZE}`
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

  const restData = useMemo(() => {
    if (!data) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...rest } = data;
    return rest;
  }, [data]);

  return (
    <>
      <h2 className="font-bold">{pageTitle}</h2>
      {!!error ? (
        <div className="text-destructive">에러 발생: {error.message}</div>
      ) : isLoading || !data ? (
        <div className="flex justify-center items-center pt-40">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <DataTable
            headers={tableHeaders}
            data={data.content}
            editable={dataEditable}
            resourceType={resourceType}
          />
          {data.total_pages > 1 && (
            <Pagination pageInfo={restData!} setPage={setPageParam} />
          )}
        </>
      )}
    </>
  );
}

export default PaginatedTableView;
