import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import ButtonComponent from "../button/button";
import { useState } from "react";
import DynamicModal from "../modal/modal";
export default function DataTable({ columns, data, permission, action }) {

  const permissionArr =
    permission === "all" ? action.split("|") : permission.split("|");

  const filteredActions = action
    .split("|")
    .filter(a => permissionArr.includes(a))
    .filter(a => a !== "add" && a !== "all");

  const actionColumn = {
    id: "actions",
    header: () => <span style={{ width: 80 }}>Action</span>,
    cell: ({ row }) => (
      <div style={{ display: "flex", gap: "4px" }}>
        {filteredActions.includes("view") && (
          <ButtonComponent 
          type="button"
          colorType="primary"
          onClick={() => handleOpen(row)}
          >
            <i className="fa fa-eye " style={{ cursor: "pointer" }} />
          </ButtonComponent>
          
        )}

        {filteredActions.includes("edit") && (
           <ButtonComponent 
            type="button"
            colorType="warning"
            onClick={() => handleOpen(row)}
            >
            <i className="fa fa-edit" style={{ cursor: "pointer" }} />
          </ButtonComponent>
        )}

        {filteredActions.includes("delete") && (
        
          <ButtonComponent 
            type="button"
            colorType="danger"
            onClick={() => handleOpen(row)}
          >
          <i className="fa fa-trash " style={{ cursor: "pointer" }} />
          </ButtonComponent>
        )}
      </div>
    )
  };

  const table = useReactTable({
    columns: [...columns,actionColumn], // ⭐ FIRST COLUMN
    data,
    getCoreRowModel: getCoreRowModel()
  });


  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  return (

    <>
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

    <DynamicModal
      isOpen={isOpen}
      onClose={handleClose}
      title="User Details"
    >
      {selectedRow && (
        <div>
          <p>Name: {selectedRow.name}</p>
          <p>Email: {selectedRow.email}</p>
          <p>Role: {selectedRow.role}</p>
        </div>
      )}
    </DynamicModal>
    </>

  );
}
