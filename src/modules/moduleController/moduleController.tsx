import  { useState, useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SidebarActive from "../../core/utils/SidebarActive";
import SideBar from "../../sharedPages/SideBar/sideBar";
import HeaderContent from "../../sharedPages/HeaderContent/HeaderContent";
import FooterContent from "../../sharedPages/FooterContent/FooterContent";
import { LoadController } from "../../core/utils/controllerLoader";
import TablePage from "./views/table";
import NotFoundPage from "../../sharedPages/NotFoundPage";
import ErrorBoundary from "../../app/providers/ErrorBoundary";
import ComponentHandler from "../../components/componentHandler";
import Loading from "../../components/CenteredSpinner/Loading";

const ModuleController = () => {


    const { dynamic,action } = useParams(); // <-- get the "dynamic" part
    const { logout, user } = useAuth();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        navigate("/login", { replace: true });
    };
    const [Config, setConfig] = useState<any>([]);

    const [ControllerFuncs, setControllerFuncs] = useState<any>({});
    const [Component, setComponent] = useState<any>(null);

    useEffect(() => {
        if (dynamic) {

            LoadController(dynamic).then(res => {
                setComponent(() => res.component);
                setControllerFuncs(res.standardFunctions);
                setConfig(res.config);
                // setData(res.standardFunctions.source?.().data || []); // data from controller
            });
     
        }
    }, []);
    
    if (!Config) {
        return <NotFoundPage />
    }

    console.log(Config);
    console.log(user);

    console.log('ControllerFuncsC',ControllerFuncs.source?.().data);
    
    if (!Config.column) {
        return <Loading/>;
    }
   
    return (
        <>

           <SidebarActive active={true} />
           


            <div className="holder">
                
                    <SideBar/>

                    <div className="wrapper ">
                            
                            <HeaderContent eventHolder={handleLogout} name={user?.name}  email={user?.email}  role={user?.role} module={Config?.module_name}/>


                            <div className="content">


                                <ErrorBoundary>
                                       
{/* 
                                        {Config?.component_type==0 && (
                                            // <div>
                                            //     {ControllerFuncs.source?.().view}
                                            // </div>
                                        )} */}

                                        {Config?.component_type==1 && (
                                            <TablePage 
                                                permission={user?.permission} 
                                                available_buttons={Config?.button}
                                                Config ={Config}
                                                Source = {ControllerFuncs.source?.().data}
                                            />
                                        )}
                                </ErrorBoundary>
                             

                            </div>

                           
                            <FooterContent/>


                            
                    </div>
            </div>
        </>
    );
};

export default ModuleController;
