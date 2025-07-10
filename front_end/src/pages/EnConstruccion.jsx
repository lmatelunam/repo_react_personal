import ContainerCard from "../components/particulas/ContainerCard";

const EnConstruccion = ({ titulo = "Página en construcción" }) => {
  return (
    <ContainerCard titulo={titulo}>
      <div className="text-center py-5">
        <h2 className="mb-3">{titulo}</h2>
        <p className="text-muted">Estamos trabajando en esta sección. Vuelve pronto.</p>
        <i className="bi bi-tools" style={{ fontSize: "3rem", color: "#adb5bd" }}></i>
      </div>
    </ContainerCard>
  );
};

export default EnConstruccion;
