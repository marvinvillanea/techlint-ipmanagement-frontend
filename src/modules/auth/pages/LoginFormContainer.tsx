import { useState } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import ComponentHandler from '../../../components/componentHandler';
import formFields from "./formFields";

const LoginFormContainer = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

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

            await login(formData.email, formData.password);

            navigate("/dashboard");

        } catch (err) {
            setError(err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

  return (
    <form
        className="d-grid gap-3"
        onSubmit={submit}
    >
        {error && <div className="alert alert-danger">{error}</div>}

       
        {formFields.map(field => (
            <ComponentHandler.Input
            key={field.name}
            type={field.type}
            label={field.label}
            required={field.required}
            autoComplete={field.autoComplete}
            value={formData[field.name]}
            eventHolder={(val) =>
                handleChange(field.name, val)
            }
            />
        ))}
       

        {/* Submit button */}
        <ComponentHandler.Button
            type="submit"
            loading={loading}
            children="Login"
        >
        </ComponentHandler.Button>
    </form>
  );
};

export default LoginFormContainer;
