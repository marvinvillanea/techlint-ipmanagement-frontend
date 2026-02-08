import  { useState, useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SidebarActive from "../../core/utils/SidebarActive";
import SideBar from "../../sharedPages/SideBar/sideBar";
import HeaderContent from "../../sharedPages/HeaderContent/HeaderContent";
import FooterContent from "../../sharedPages/FooterContent/FooterContent";
import { LoadController } from "../../core/utils/controllerLoader";
import CenteredSpinner from "../../components/CenteredSpinner/CenteredSpinner";
import ComponentHandler from "../../components/componentHandler";
import { useUsers } from "../../core/hooks/useUsers/useUsers";

const ModuleController = () => {
    const { dynamic,action } = useParams(); // <-- get the "dynamic" part
    const { logout, user } = useAuth();

     
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const [Config, setConfig] = useState<any>([]);

    const [ControllerFuncs, setControllerFuncs] = useState<any>({});
    const [Component, setComponent] = useState<any>(null);
    //  useEffect(() => {
    //      LoadController(dynamic || "").then(res => {
    //         setComponent(() => res.component);
    //         setControllerFuncs(() => res.standardFunctions);
    //         setConfig(() => res.config);
    //     });

    // }, [dynamic]);

      useEffect(() => {
        if (dynamic) {
            LoadController(dynamic).then(res => {
                setComponent(() => res.component);
                setControllerFuncs(res.standardFunctions);
                setConfig(res.config || []);
                // setData(res.standardFunctions.source?.().data || []); // data from controller
            });
           
        }
    }, [dynamic]);
    

  
    if (Config.length<0) return <CenteredSpinner />;

    console.log('kebgh',Config.length)

    // const { data, view } = ControllerFuncs.source?.() || { data: [], view: null };


    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // console.log(action);
  
    // console.log(Config);

    const columns = Config.map(c => ({ key: c.key, label: c.label }));
    // console.log(json_data);

    console.log("Config:", Config);
    console.log("Columns:", columns);
    // console.log("Data:", data);
   

    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");

   

    const {data,isFetching}= useUsers(page,search);
    


    const totalPages = Math.ceil(
        (data?.total || 0) / (data?.perPage || 1)
    );
    console.log(data);
    return (
        <>

           <SidebarActive active={true} />
           


            <div className="holder">
                    <SideBar/>

                    <div className="wrapper ">
                            
                            <HeaderContent eventHolder={handleLogout} name={user?.name}  email={user?.email}  role={user?.roles}/>


                            <div className="content">
                                 <div>
                                    <h2>Module Content</h2>
                                 {/* Dynamic content from controller */}
                                            {ControllerFuncs.source?.().view}

                                    {/* Optional: loop over data separately */}
                                      <div>
                                        <ul>
                                            {/* {data.map((item: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                                                <li key={item.id}>{item.name}</li>
                                            ))} */}
                                        </ul>
                                    </div>
                                </div>


                                {/* {Config?.map?.(field => (
                                    <div key={field.key}>{field.label}</div>
                                ))} */}
                                   {Component && <Component  />}





                                    <div>
                                        <button
                                            onClick={handleOpen}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Open Modal
                                        </button>

                                        <ComponentHandler.Modal
                                            isOpen={isOpen}
                                            onClose={handleClose}
                                            title="Dynamic Modal Example"
                                            footer={
                                                <>
                                                    <button
                                                        onClick={handleClose}
                                                        className="px-4 py-2 bg-gray-300 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => alert("Saved!")}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                                    >
                                                        Save
                                                    </button>
                                                </>
                                            }
                                        >
                                          
                                        </ComponentHandler.Modal>


                                          <div className="container mt-4">
                                            <h2>Dynamic Table Example</h2>

                                                <input
                                                placeholder="Search"
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                    setSearch(e.currentTarget.value);
                                                    }
                                                }}
                                                />

                                            <ComponentHandler.DynamicTable columns={Config} data={data?.data||[]} />
                                            {isFetching && (
                                                'Loading....'
                                            )}
                                            <br></br>
                                            
                                            
                                  

                                            <button
                                            className="btn btn-sm btn-secondary"
                                            disabled={page === 1}
                                            onClick={() => setPage(page - 1)}
                                            >
                                            Prev
                                            </button>

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

                           
                            <FooterContent/>


                            
                    </div>
            </div>
        </>
    );
};

export default ModuleController;
