"use client";

import PortalHost from "@/components/custom/portal/host";
import PaginatedTableView from "@/components/custom/view/paginated-table";
import { PORTAL_HOSTS, USER_TABLE_HEADERS } from "@/lib/constants";
import { usePortalStore, useRoleStore } from "@/lib/store";
import { Suspense } from "react";

export default function UsersPage() {
  const role = useRoleStore((state) => state.role);

  return (
    <>
      <div className="flex flex-col justify-between mt-4 gap-4">
        <Suspense>
          <PaginatedTableView
            resourceType={"users"}
            tableHeaders={USER_TABLE_HEADERS}
            pageTitle={"사용자 관리"}
            dataEditable={role === "admin"}
          />
        </Suspense>
      </div>
      <PortalHost portalHostId={PORTAL_HOSTS.USERS} />
    </>
  );
}
