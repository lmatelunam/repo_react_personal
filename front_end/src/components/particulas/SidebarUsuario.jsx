const SidebarUsuario = ({ usuario, colapsado }) => {
  return (
    <div className="mb-4 d-flex flex-column align-items-center text-center">
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: "1.5rem",
          userSelect: "none",
          marginBottom: "0.5rem",
        }}
        title={usuario?.NombreUsuario}
      >
        <i className="bi bi-person-fill"></i>
      </div>

      {!colapsado && (
        <>
          <h6 className="mb-0">{usuario?.NombreUsuario}</h6>
          <small className="text-muted">{usuario?.Email || "Sin email"}</small>
        </>
      )}
    </div>
  );
};

export default SidebarUsuario;
