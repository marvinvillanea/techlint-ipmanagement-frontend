const CenteredSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
      }}
    >
      <div className="spinner-border text-primary preload-spinner"></div>
    </div>
  );
};

export default CenteredSpinner;
