import React, { useState, useMemo } from "react";
import ComponentHandler from "../../../components/componentHandler";
import ButtonPermission from "./createPermissionButton";
import Loading from "../../../components/CenteredSpinner/Loading";
import { useViewData } from "../../../core/hooks/useViewData/useViewData";
import ButtonComponent from "../../../components/button/button";
import DynamicModal from "../../../components/modal/modal";
import DynamicForm from "./DynamicForm";
type TablePageProps = {
  permission: string;       // e.g. "all" or "add|delete"
  available_buttons: string; // e.g. "add|delete|view|edit|all"
  Config:any;
  Source:any
};

const TablePage: React.FC<TablePageProps> = ({ permission, available_buttons, Config,Source }) => {
  
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


    const totalPages = data?.data.total && data?.data.per_page
    ? Math.ceil(data.data.total / data.data.per_page)
    : 1;

    const permissionArr =
        permission === "all" ? available_buttons.split("|") : permission.split("|");

    const filteredActions = available_buttons
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
            onClick={() =>  handleOpenModal(row, "view")}
            >
                <i className="fa fa-eye " style={{ cursor: "pointer" }} />
            </ButtonComponent>
            
            )}

            {filteredActions.includes("edit") && (
            <ButtonComponent 
                type="button"
                colorType="warning"
                onClick={() =>  handleOpenModal(row, "edit")}
                >
                <i className="fa fa-edit" style={{ cursor: "pointer" }} />
            </ButtonComponent>
            )}

            {filteredActions.includes("delete") && (
            
            <ButtonComponent 
                type="button"
                colorType="danger"
                onClick={() =>  handleOpenModal(row, "delete")}
            >
            <i className="fa fa-trash " style={{ cursor: "pointer" }} />
            </ButtonComponent>
            )}
        </div>
        )
    };

    const columns = useMemo(() => {
        return [...(Config?.column ?? []), actionColumn];
    }, [Config, actionColumn]);



    
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [actionType, setActionType] = useState("");

    const handleClose = () => {
        setIsOpen(false);
        setSelectedRow(null);
        setActionType("");
    };

    const handleOpenModal = (row: any, type: string) => {
        console.log(row.original?? row, type);
        setSelectedRow(row.original ?? row);
        setActionType(type);
        setIsOpen(true);
    };

        
    if (!Config) {
        return <Loading />;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    if (isFetching && !data) {
        return <Loading />;
    }

    console.log('selectedRow',selectedRow);
    // TABLE FUNCTION AND DATA COLUMN 

    console.log('Source',Source);

  return (
      <div className="container-fluid g-4">
          <div className="row">
              <div className="col-12">
                  
                  <div className="portlet">
                      <div className="portlet-header portlet-header-bordered">
                          <h3 className="portlet-title">
                            <ButtonPermission permission={permission||''} available_buttons={available_buttons||''} Config={Config} Source={Source??{}} />
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
                                columns={columns||[]}
                                data={data?.data?.data || []}
                              />

                              {isFetching && (
                                <div className="table-overlay">
                                  <Loading />
                                </div>
                              )}




                            <DynamicModal
                                isOpen={isOpen}
                                onClose={handleClose}
                                title={`${Config?.module_name} - ${actionType?.toUpperCase()}`}
                            >
                                {selectedRow && (
                                    <>
                                        {actionType === "view" && (
                                            <div>
                                                 <DynamicForm
                                                    Config={Config??{}}
                                                    Source={Source??{}}
                                                    modalClose={handleClose}
                                                    data={selectedRow ?? {}}
                                                    type={actionType}
                                                />
                                            </div>
                                        )}

                                        {actionType === "edit" && (
                                            <div>
                                            <DynamicForm
                                                Config={Config??{}}
                                                Source={Source??{}}
                                                modalClose={handleClose}
                                                data={selectedRow ?? {}}
                                                type={actionType}
                                            />
                                            </div>
                                        )}

                                        {actionType === "delete" && (
                                            <div>
                                                 <DynamicForm
                                                    Config={Config??{}}
                                                    Source={Source??{}} 
                                                    modalClose={handleClose}
                                                    data={selectedRow ?? {}}
                                                    type={actionType}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </DynamicModal>

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
