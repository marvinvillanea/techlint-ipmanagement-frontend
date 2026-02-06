import { useAuth } from "../../app/providers/AuthProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ModuleController = () => {
    const { dynamic,action } = useParams(); // <-- get the "dynamic" part
    const { logout, user } = useAuth();


    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    
  return (
    <>
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>

        <div>
            <h1>Dynamic Route Example</h1>
            <p>The dynamic value is: -- {dynamic}</p>
            <p>This is the "fun" part of the URL.  ---{action}</p>
        </div>
    </>
  );
};

export default ModuleController;
