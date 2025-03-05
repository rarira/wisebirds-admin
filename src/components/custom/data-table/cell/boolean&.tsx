"use client";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

function DataTableBooleanCell({
  value,
  disabled,
}: {
  value: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(value);

  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
      disabled={disabled}
    />
  );
}

export default DataTableBooleanCell;
