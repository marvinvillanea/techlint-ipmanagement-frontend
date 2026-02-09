import React, { useState } from "react";
import InputField from "../../components/input/input";
import Loading from "../../components/CenteredSpinner/Loading";
import { Navigate } from "react-router-dom";
import ComponentHandler from "../../components/componentHandler";
import api from "../api/axios";

type DynamicFormProps = {
    Config:any;
    modalClose: () => void;
};
const DynamicForm: React.FC<DynamicFormProps> = ({ Config,modalClose }) => {
  // Define your form structure
    
    if (!Config) {
        return <Loading />;
    }
    const formFields = Config.form;

    // const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


     const [formData, setFormData] = useState(
        Object.fromEntries(formFields.map(f => [f.name, ""]))
    );


    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };


    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            console.log('LOGIN RUNNING');
            // await login(formData.email, formData.password);


            const { data } = await api.post("/auth/register",formData);


            if (data?.status) {
                window.location.reload(); // reload page
            }

           
            // navigate("/module/"+import.meta.env.VITE_DEFAULT_MODULE+"/");

        } catch (err) {
            setError('Email already Registered!.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="d-grid gap-3 was-validated" onSubmit={submit}>
                {formFields.map((field) => {
                    // Render a custom HTML field if type === "html"
                    if (field.type === "html") {
                    return (
                          <div key={field.name}  className="validation-container">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={formData[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    key="floatingSelect"
                                    required
                                >
                                    <option value="">Select Permission</option>
                                    <option value="all">ALL(Except Delete)</option>
                                    <option value="view|add|edit">Can Add, Edit</option>
                                    <option value="view|add">Can Add</option>
                                    <option value="view|edit">Can Edit</option>
                                </select>
                                <label htmlFor="floatingSelect2">User Permission</label>
                            </div>
                        </div>
                    );
                    }

                    // Otherwise render InputField
                    return (
                        <InputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            required={true}
                            value={formData[field.name]}
                            eventHolder={(value) => handleChange(field.name, value)}
                            className={field.className}
                        />
                    );
                })}


                {error && <div className="alert alert-danger">{error}</div>}

               <div >
                     <ComponentHandler.Button
                        type="submit"
                        loading={loading}
                        children="Submit"
                        className="m-2"
                        colorType="primary"
                    >
                    </ComponentHandler.Button>
                     <ComponentHandler.Button
                        type="button"
                        onClick={modalClose}
                        children="Close"
                        className="m-2"
                        colorType="danger"
                    >
                    </ComponentHandler.Button>
                </div> 

        </form>
    );
};

export default DynamicForm;
