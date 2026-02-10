import React, { useState,useEffect } from "react";
import InputField from "../../../components/input/input";
import Loading from "../../../components/CenteredSpinner/Loading";
import { Navigate,useParams } from "react-router-dom";
import ComponentHandler from "../../../components/componentHandler";
import api from "../../../core/api/axios";
import Swal from "sweetalert2";
type DynamicFormProps = {
    Config:any;
    modalClose: () => void;
    data?: Record<string, any>;
    type:string;
};
const DynamicForm: React.FC<DynamicFormProps> = ({ Config,modalClose,data , type}) => {
  // Define your form structure
    
 
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
    
    const { dynamic, action } = useParams(); // dynamic = "auth", action = "register"


    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            console.log('LOGIN RUNNING');
            // await login(formData.email, formData.password);

            const { data } = await api.post(`/process/${dynamic}/${type}`, formData);

            console.log(data);

            // if (data?.status) {
            //     window.location.reload(); // reload page
            // }

            if (data?.status) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data?.message || 'Saved successfully!',
                    confirmButtonText: 'OK'
                });

                window.location.reload();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: data?.message || 'Something went wrong!',
                    confirmButtonText: 'OK'
                });
            }

           
            // navigate("/module/"+import.meta.env.VITE_DEFAULT_MODULE+"/");

        } catch (err) {
            setError('Email already Registered!.' + err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!data) return;

        const initialData = Object.fromEntries(
            formFields.map(f => [f.name, data[f.name] ?? ""])
        );

        setFormData(initialData);
    }, [data, formFields]);

    const filteredFormFields = formFields.filter(f => {
        // Remove password field on edit
        if (type === "edit" && f.type === "password") return false;
        return true;
    });


    return (
        <form className="d-grid gap-3 was-validated" onSubmit={submit}>
                {filteredFormFields.map((field) => {
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
