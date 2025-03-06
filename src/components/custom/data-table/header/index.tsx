import { TableHeader } from "@/lib/types";
import { cn } from "@/components/lib/utils";

type DataTableHeaderProps = {
  column: TableHeader;
};

function DataTableHeader({
  column: { name, label, type, width },
}: DataTableHeaderProps) {
  return (
    <th
      key={name}
      className={cn(
        "flex w-full",
        type === "integer" || type === "float"
          ? "justify-end"
          : "justify-start",
        `grow-${width}`
      )}
    >
      {label}
    </th>
  );
}

export default DataTableHeader;
