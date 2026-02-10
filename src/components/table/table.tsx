import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
export default function DataTable({ columns, data}) {

  const table = useReactTable({
    columns: [...columns], // ⭐ FIRST COLUMN
    data,
    getCoreRowModel: getCoreRowModel()
  });


  return (

    <table className="table table-bordered table-striped table-hover">
      <thead>
        {table.getHeaderGroups().map(g => (
          <tr key={g.id}>
            {g.headers.map(h => (
              <th key={h.id}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  );
}
