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
        "flex w-full text-muted-foreground font-normal grow-${width}",
        (type === "boolean" || type == "edit-button") &&
          "justify-center max-w-12 grow-0",
        type === "integer" || type === "float" ? "justify-end" : "justify-start"
      )}
    >
      {label}
    </th>
  );
}

export default DataTableHeader;
