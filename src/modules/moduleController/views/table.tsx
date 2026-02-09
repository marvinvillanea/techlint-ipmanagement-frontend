import React, { useState } from "react";
// import DataTableDynamic from "../../../components/table/table";
import ComponentHandler from "../../../components/componentHandler";
import ButtonPermission from "../../../core/utils/createPermissionButton";
import { useUsers } from "../../../core/hooks/useUsers/useUsers";
import Loading from "../../../components/CenteredSpinner/Loading";

type TablePageProps = {
  permission: string;       // e.g. "all" or "add|delete"
  available_buttons: string; // e.g. "add|delete|view|edit|all"
  Config:any
};

const TablePage: React.FC<TablePageProps> = ({ permission, available_buttons, Config }) => {
  
  console.log(Config);


  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");

  const {data,isFetching}= useUsers(page,search);


  if (isFetching && !data && Config) {
    return <Loading/>;
  }

  const totalPages = data
  ? Math.ceil(data.total / data.perPage)
  : 1;
  console.log(data);




  return (
      <div className="container-fluid g-4">
          <div className="row">
              <div className="col-12">
                  
                  <div className="portlet">
                      <div className="portlet-header portlet-header-bordered">
                          <h3 className="portlet-title">
                            <ButtonPermission permission={permission||''} available_buttons={available_buttons||''} />
                          </h3>
                      </div>
                      <div className="portlet-body">
                          <p><strong>Datatables</strong> has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function: <code>$().DataTable()</code>. Searching, ordering and paging goodness will be immediately added to the table, as shown in this example.</p>
                          
                          <input
                              className="form-control mb-2"
                              placeholder="Search..."
                              onKeyDown={e => {
                                  if (e.key === "Enter") {
                                  setSearch(e.currentTarget.value);
                                  }
                              }}
                              />

                         

                          <div style={{ position: "relative" }}>
                              
                              <ComponentHandler.DynamicTable
                                columns={Config?.column}
                                data={data?.data || []}
                                permission={permission || ''}
                                action={available_buttons || ''}
                              />

                              {isFetching && (
                                <div className="table-overlay">
                                  <Loading />
                                </div>
                              )}

                            </div>
                          
                          
                

                      <div className="d-flex justify-content-end gap-1 mt-3">
                          {/* Previous Button */}
                          <button
                              className="btn btn-sm btn-secondary"
                              disabled={page === 1}
                              onClick={() => setPage(page - 1)}
                          >
                              Prev
                          </button>

                          {/* Page Numbers */}
                          {[...Array(totalPages)].map((_, i) => (
                              <button
                                  key={i}
                                  className={`btn btn-sm ${
                                      page === i + 1 ? "btn-primary" : "btn-light"
                                  }`}
                                  onClick={() => setPage(i + 1)}
                              >
                                  {i + 1}
                              </button>
                          ))}

                          {/* Next Button */}
                          <button
                              className="btn btn-sm btn-secondary"
                              disabled={page === totalPages}
                              onClick={() => setPage(page + 1)}
                          >
                              Next
                          </button>
                      </div>
                          {/* <table  className="table table-bordered table-striped table-hover">
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>Card ID</th>
                                      <th>Name</th>
                                      <th>Position</th>
                                      <th>Office</th>
                                      <th>Age</th>
                                      <th>Start date</th>
                                      <th>Salary</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>1</td>
                                      <td>629047</td>
                                      <td>Tiger Nixon</td>
                                      <td>System Architect</td>
                                      <td>Edinburgh</td>
                                      <td>61</td>
                                      <td>2011/04/25</td>
                                      <td>$320,800</td>
                                  </tr>
                                  <tr>
                                      <td>2</td>
                                      <td>629547</td>
                                      <td>Garrett Winters</td>
                                      <td>Accountant</td>
                                      <td>Tokyo</td>
                                      <td>63</td>
                                      <td>2011/07/25</td>
                                      <td>$170,750</td>
                                  </tr>
                                  <tr>
                                      <td>3</td>
                                      <td>129547</td>
                                      <td>Ashton Cox</td>
                                      <td>Junior Technical Author</td>
                                      <td>San Francisco</td>
                                      <td>66</td>
                                      <td>2009/01/12</td>
                                      <td>$86,000</td>
                                  </tr>
                                  
                              </tbody>
                          </table> */}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default TablePage;
