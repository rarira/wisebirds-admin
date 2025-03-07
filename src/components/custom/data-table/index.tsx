import { ResourceContentTypeMap, TableHeader } from "@/lib/types";
import DataTableHeader from "./header";
import DataTableCell from "./cell";

type DataTableProps<T extends keyof ResourceContentTypeMap> = {
  resourceType: T;
  headers: TableHeader[];
  data: ResourceContentTypeMap[T];
  editable?: boolean;
};

function DataTable({
  resourceType,
  headers,
  data,
  editable,
}: DataTableProps<keyof ResourceContentTypeMap>) {
  return (
    <table className="flex flex-col w-full border-collapse">
      <thead className="flex flex-row w-full">
        <tr className="flex flex-row w-full border-b-1 py-1 items-center">
          {headers.map((header) => (
            <DataTableHeader key={header.name} column={header} />
          ))}
        </tr>
      </thead>

      <tbody className="flex flex-col w-full">
        {data.length === 0 ? (
          <tr key={"nodata"} className="flex flex-row w-full py-1 items-center">
            <td colSpan={headers.length}>No data available</td>
          </tr>
        ) : (
          <>
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
                    row={row}
                    resourceType={resourceType}
                  />
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

export default DataTable;
