"use client";

import PaginatedTableView from "@/components/custom/view/paginated-table";
import { CAMPAIGN_TABLE_HEADERS } from "@/lib/constants";
import { useRoleStore } from "@/lib/store";
import { Suspense } from "react";

export default function HomePage() {
  const role = useRoleStore((state) => state.role);

  return (
    <div className="flex flex-col justify-between mt-4 gap-4">
      <Suspense>
        <PaginatedTableView
          pageTitle="캠페인 관리"
          tableHeaders={CAMPAIGN_TABLE_HEADERS}
          resourceType="campaigns"
          dataEditable={role !== "viewer"}
        />
      </Suspense>
    </div>
  );
}
