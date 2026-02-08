import React, { useState, useEffect } from "react";
import DataTableDynamic from "../../../components/table/table";


const TablePage = () => {
    
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Example dynamic config
    setColumns([
      { title: "ID", data: "id" },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Age", data: "age" }
    ]);

    // Example data
    setData([
      { id: 1, name: "Juan", email: "juan@mail.com", age: 25 },
      { id: 2, name: "Maria", email: "maria@mail.com", age: 30 },
      { id: 3, name: "Pedro", email: "pedro@mail.com", age: 22 }
    ]);
  }, []);

  return (
    <div className="container mt-4">
      <h3>Dynamic DataTable</h3>
      <DataTableDynamic columns={columns} data={data} />
    </div>
  );
};

export default TablePage;
