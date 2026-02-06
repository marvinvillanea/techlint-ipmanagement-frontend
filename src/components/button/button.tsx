const Button = ({
  type = "button",
  children = null,
  onClick = () => {},
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  className = ""
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-label-success btn-lg btn-widest ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
