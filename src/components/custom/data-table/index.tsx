import { Identifiable, TableHeader } from "@/lib/types";
import DataTableHeader from "./header";
import DataTableCell from "./cell";

type DataTableProps<T extends Identifiable[]> = {
  headers: TableHeader[];
  data: T;
  editable?: boolean;
};

function DataTable<T extends Identifiable[]>({
  headers,
  data,
  editable,
}: DataTableProps<T>): React.JSX.Element {
  return (
    <table className="flex flex-col w-full border-collapse">
      <thead className="flex flex-row w-full">
        <tr className="flex flex-row w-full border-y-1 py-1 items-center">
          {headers.map((header) => (
            <DataTableHeader key={header.name} column={header} />
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-col w-full">
        {data.map((row) => (
          <tr
            key={row.id}
            className="flex flex-row w-full border-y-1 py-1 items-center"
          >
            {headers.map((header) => (
              <DataTableCell
                key={header.name}
                column={header}
                value={row[header.name]}
                editable={editable}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
