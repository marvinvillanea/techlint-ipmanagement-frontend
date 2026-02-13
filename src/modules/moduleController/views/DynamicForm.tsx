import React, { useState,useEffect } from "react";
import InputField from "../../../components/input/input";
import { useParams } from "react-router-dom";
import ComponentHandler from "../../../components/componentHandler";
import api from "../../../core/api/axios";
import Swal from "sweetalert2";
type DynamicFormProps = {
    Config:any;
    Source:any;
    modalClose: () => void;
    data?: Record<string, any>;
    type:string;
};

type FormField = {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  size?:string;
  break?:BigInteger;
};


type Option = {
    id: string;
    label: string;
};


const DynamicForm: React.FC<DynamicFormProps> = ({ Config,Source,modalClose,data , type}) => {
  // Define your form structure
    
 
    const formFields: FormField[] = Config.form
    // const navigate = useNavigate();
    type SourceType = Record<string, Option[]>;
    const source: SourceType = Source;
    
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

    console.log(action);
    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        const confirm = await Swal.fire({
            icon: (type=="delete"?'warning' : 'info'),
            title: 'Are you sure?',
            text: `Are you sure you want to ${type.toUpperCase()} this record?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Continue',
            cancelButtonText: 'Cancel'
        });

        if (!confirm.isConfirmed) return;
        try {

            
            
            setLoading(true);
            setError("");
            console.log('LOGIN RUNNING');
            // await login(formData.email, formData.password);

            const payload = { ...formData };
            if (type === "edit") {
                delete payload.password;
            }
            const { data } = await api.post(`/process/${dynamic}/${type}`, payload);

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

    console.log(Source);


    useEffect(() => {
        if (!data) return;

        const initialData = {
            id: data.id, // <-- ADD THIS
            ...Object.fromEntries(
                formFields.map(f => [f.name, data[f.name] ?? ""])
            )
        };

        setFormData(initialData);
    }, [data, formFields]);

    const filteredFormFields = formFields.filter(f => {
        // Remove password field on edit
        if ((type != "add") && f.type === "password") return false;
        return true;
    });

    const isViewOnly = type === "view" || type === "delete";


    return (
        <form className="d-grid gap-3 was-validated" onSubmit={submit}>
                {filteredFormFields.map((field) => {
                    // Render a custom HTML field if type === "html"
                    if (field.type === "html") {
                    return (
                          <div key={field.name}  className="validation-container"  >
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={formData[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    key="floatingSelect"
                                    required
                                    disabled={isViewOnly}
                                >
                                    <option value="">Select Permission</option>
                                    <option value="all">ALL(Except Delete)</option>
                                    <option value="view|add|edit">Can Add, Edit</option>
                                    <option value="view|add">Can Add</option>
                                    <option value="view|edit">Can Edit</option>
                                    <option value="view">View Only</option>
                                </select>
                                <label htmlFor="floatingSelect2">User Permission</label>
                            </div>
                        </div>
                    );
                    }

                    if (field.type === "select") {
                        return (
                            <div key={field.name}  className="validation-container"  >
                                <div className="form-floating">
                                    <select
                                        className="form-select"
                                        value={formData[field.name]}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        key="floatingSelect ${field.name} "
                                        required
                                        disabled={isViewOnly}
                                    >   
                                        <option value="">--select--</option>
                                        {source[field.name].map((t) => {
                                            return (
                                                <option value={t.id}>{t.label}</option>  
                                            );
                                        })};
                                    
                                    </select>
                                    <label htmlFor="floatingSelect ${field.name}">{field.label}</label>
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
                            required={!isViewOnly}
                            value={formData[field.name]}
                            eventHolder={(value) => handleChange(field.name, value)}
                            className={field.className}
                            disabled={isViewOnly}
                        />
                    );
                })}


                {error && <div className="alert alert-danger">{error}</div>}
            
              {type!="view" && (
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
              )}

        </form>
    );
};

export default DynamicForm;
