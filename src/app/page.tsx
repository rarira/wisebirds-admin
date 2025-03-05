"use client";
import DataTable from "@/components/custom/data-table";
import { CampaignTableData, CampaignTableHeaders } from "@/lib/constants";
import { useRoleStore } from "@/lib/store";

export default function Home() {
  const role = useRoleStore((state) => state.role);

  return (
    <div className="flex flex-1 mt-4">
      <DataTable
        headers={CampaignTableHeaders}
        data={CampaignTableData}
        editable={role !== "viewer"}
      />
    </div>
  );
}
