import { DataType, TableHeader } from "@/lib/types";
import { cn } from "@/components/lib/utils";
import { ReactElement } from "react";
import { getFormattedInteger, getPercentageString } from "@/lib/utils";
import DataTableBooleanCell from "./boolean&";

type DataTableCellProps = {
  column: TableHeader;
  value: string | number | boolean;
  editable?: boolean;
};

function DataTableCell({
  column: { name, type, values, width },
  value,
  editable,
}: DataTableCellProps) {
  const getCellValue = (
    value: string | number | boolean,
    type: DataType
  ): ReactElement => {
    switch (type) {
      case "constant":
        return <span>{values![value as string]}</span>;
      case "integer":
        return <span>{getFormattedInteger(value as number)}</span>;
      case "float":
        return <span>{getPercentageString(value as number)}</span>;
      case "boolean":
        return (
          <DataTableBooleanCell value={value as boolean} disabled={!editable} />
        );
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <td
      key={name}
      className={cn(
        "flex w-full",
        type === "boolean" && "justify-center max-w-12",
        type === "integer" || type === "float"
          ? "justify-end"
          : "justify-start",
        `flex-${width}`
      )}
    >
      {getCellValue(value, type)}
    </td>
  );
}

export default DataTableCell;
