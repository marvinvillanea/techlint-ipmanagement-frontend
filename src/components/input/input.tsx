const InputField = ({
    value = "",
    eventHolder = (value: string) => {},
    required = false,
    label = "Password",
    placeholder = "Password",
    type = "password",
    autoComplete = "email",
    className=""
}) => {
  return (
    <div className="validation-container">
      <div className="form-floating">
        <input
            className={`form-control form-control-lg ${className}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => eventHolder(e.target.value)}
            required={required}
            autoComplete={autoComplete}
        />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default InputField;
