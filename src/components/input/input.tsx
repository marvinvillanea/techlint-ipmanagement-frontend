const InputField = ({
    value = "",
    eventHolder = (_value: string): void => {},
    required = false,
    label = "Password",
    placeholder = "Password",
    type = "password",
    autoComplete = "email",
    className="",
    disabled=false
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
            disabled={disabled}
        />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default InputField;
