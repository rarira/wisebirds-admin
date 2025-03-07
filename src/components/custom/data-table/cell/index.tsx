import {
  CampaignContent,
  DataType,
  ResourceContentTypeMap,
  TableHeader,
  UserContent,
} from "@/lib/types";
import { cn } from "@/components/lib/utils";
import { ReactElement } from "react";
import {
  getFormattedInteger,
  getFormattedTimeDateString,
  getPercentageString,
} from "@/lib/utils";
import DataTableBooleanCell from "./boolean&";
import DataTableEditCell from "./edit&";

type DataTableCellProps<T extends keyof ResourceContentTypeMap> = {
  resourceType: T;
  row: ResourceContentTypeMap[T][number];
  column: TableHeader;
  value: string | number | boolean;
  editable?: boolean;
};

function DataTableCell({
  resourceType,
  column: { name, type, values, width },
  value,
  editable,
  row,
}: DataTableCellProps<keyof ResourceContentTypeMap>) {
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
        if (resourceType === "campaigns") {
          return (
            <DataTableBooleanCell
              value={value as boolean}
              disabled={!editable}
              row={row as CampaignContent}
            />
          );
        }
        return <span>{value ? "활성" : "비활성"}</span>;
      case "date":
        return <span>{getFormattedTimeDateString(value as string)}</span>;
      case "edit-button":
        if (resourceType === "users") {
          return <DataTableEditCell row={row as UserContent} value={"수정"} />;
        }
        return <span>{value}</span>;
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <td
      key={name}
      className={cn(
        "flex w-full",
        (type === "boolean" || type === "edit-button") &&
          "justify-center max-w-12",
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
