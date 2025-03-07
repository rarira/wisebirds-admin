"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import UserEditModal from "@/components/custom/modal/user-edit";
import { UserContent } from "@/lib/types";
import { PORTAL_HOSTS } from "@/lib/constants";

function DataTableEditCell({
  value,
  row,
}: {
  value: string;
  row: UserContent;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className="flex font-bold text-primary">
        {value}
      </button>
      {open &&
        createPortal(
          <UserEditModal row={row} setOpen={setOpen} />,
          document.getElementById(PORTAL_HOSTS.USERS)!
        )}
    </>
  );
}

export default DataTableEditCell;
