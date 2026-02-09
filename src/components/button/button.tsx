interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  loadingText?:"Loading...",
  className?:"",
  disabled?: boolean,
  type?: "button" | "submit" | "reset", // <-- use union, not string
  colorType?:"";
}

const ButtonComponent = ({
  children,
  onClick,
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  className="",
  type = "button",
  colorType = "success"
}: ButtonProps) => {

  

  return (
    <button
      type={type} // TS is happy now
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-label-${colorType}  btn-widest ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default ButtonComponent;

