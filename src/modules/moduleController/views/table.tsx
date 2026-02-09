import React, { useState } from "react";
import ComponentHandler from "../../../components/componentHandler";
import ButtonPermission from "../../../core/utils/createPermissionButton";
import Loading from "../../../components/CenteredSpinner/Loading";
import { useViewData } from "../../../core/hooks/useViewData/useViewData";


type TablePageProps = {
  permission: string;       // e.g. "all" or "add|delete"
  available_buttons: string; // e.g. "add|delete|view|edit|all"
  Config:any
};

const TablePage: React.FC<TablePageProps> = ({ permission, available_buttons, Config }) => {
  
    console.log('STARTT NOOWWWW');
    console.log(Config);


    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");

    //const {data,isFetching}= useUsers(page,search);


    const { data, isFetching, error } = useViewData(
        page,
        search,
        Config?.source,
        Config?.column  ??[]
    );

        
    if (!Config) {
        return <Loading />;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    if (isFetching && !data) {
        return <Loading />;
    }

    const totalPages = data?.data.total && data?.data.per_page
    ? Math.ceil(data.data.total / data.data.per_page)
    : 1;
    

    console.log('dsafdsafdasfsadf', data?.data.data)
    console.log(data);

    console.log(Config);



  return (
      <div className="container-fluid g-4">
          <div className="row">
              <div className="col-12">
                  
                  <div className="portlet">
                      <div className="portlet-header portlet-header-bordered">
                          <h3 className="portlet-title">
                            <ButtonPermission permission={permission||''} available_buttons={available_buttons||''} Config={Config} />
                          </h3>
                      </div>
                      <div className="portlet-body">
                          <p ><strong >{Config?.module_name}</strong><span className="text-danger"> {Config?.description}</span></p>
                          
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
                                data={data?.data?.data || []}
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
                         
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default TablePage;
