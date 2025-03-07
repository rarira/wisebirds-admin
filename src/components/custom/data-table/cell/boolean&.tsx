"use client";
import { Switch } from "@/components/ui/switch";
import { CampaignContent } from "@/lib/types";
import { useUpdateCampaignStatus } from "@/hooks/useUpdateCampaignStatus";

function DataTableBooleanCell({
  value,
  disabled,
  row,
}: {
  value: boolean;
  row: CampaignContent;
  disabled?: boolean;
}) {
  const { handleChange } = useUpdateCampaignStatus(row.id);

  return (
    <Switch
      checked={value}
      onCheckedChange={handleChange}
      disabled={disabled}
    />
  );
}

export default DataTableBooleanCell;
