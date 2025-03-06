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
        "flex w-full text-muted-foreground font-normal",
        type === "boolean" && "justify-center max-w-12",
        type === "integer" || type === "float"
          ? "justify-end"
          : "justify-start",
        `flex-${width}`
      )}
    >
      {label}
    </th>
  );
}

export default DataTableHeader;
