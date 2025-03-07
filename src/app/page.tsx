"use client";

import PaginatedTableView from "@/components/custom/view/paginated-table";
import { CAMPAIGN_TABLE_HEADERS } from "@/lib/constants";
import { useRoleStore } from "@/lib/stores";
import { Suspense } from "react";

export default function HomePage() {
  const role = useRoleStore((state) => state.role);

  return (
    <div className="flex flex-col justify-between mt-4 gap-4">
      <h2 className="font-bold">캠페인 관리</h2>
      <div className="w-full h-[1px] bg-gray-200" />

      <Suspense>
        <PaginatedTableView
          tableHeaders={CAMPAIGN_TABLE_HEADERS}
          resourceType="campaigns"
          dataEditable={role !== "viewer"}
        />
      </Suspense>
    </div>
  );
}
