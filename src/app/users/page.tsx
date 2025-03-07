"use client";

import NoAccessDialog from "@/components/custom/dialog/no-access";
import UserAddModal from "@/components/custom/modal/user-add";
import PortalHost from "@/components/custom/portal/host";
import PaginatedTableView from "@/components/custom/view/paginated-table";
import { PORTAL_HOSTS, USER_TABLE_HEADERS } from "@/lib/constants";
import { useRoleStore } from "@/lib/stores";
import { Suspense, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function UsersPage() {
  const role = useRoleStore((state) => state.role);
  const [openNoAccessDialog, setOpenNoAccessDialog] = useState(false);
  const [openUserAddModel, setOpenUserAddModel] = useState(false);

  useLayoutEffect(() => {
    if (role !== "admin") {
      setOpenNoAccessDialog(true);
    }
  }, [role]);

  return (
    <>
      <div className="flex flex-col justify-between mt-4 gap-4">
        <h2 className="font-bold">사용자 관리</h2>
        <div className="w-full h-[1px] bg-gray-200" />
        <button
          className="px-3 py-2 rounded-sm bg-primary w-fit text-white"
          onClick={() => {
            setOpenUserAddModel(true);
          }}
        >
          생성
        </button>
        <Suspense>
          <PaginatedTableView
            resourceType={"users"}
            tableHeaders={USER_TABLE_HEADERS}
            dataEditable={role === "admin"}
          />
        </Suspense>
      </div>
      <PortalHost portalHostId={PORTAL_HOSTS.USERS} />
      {openUserAddModel &&
        createPortal(
          <UserAddModal setOpen={setOpenUserAddModel} />,
          document.getElementById(PORTAL_HOSTS.USERS.toString())!
        )}
      {openNoAccessDialog &&
        createPortal(
          <NoAccessDialog onClose={() => setOpenNoAccessDialog(false)} />,
          document.getElementById(PORTAL_HOSTS.USERS.toString())!
        )}
    </>
  );
}
