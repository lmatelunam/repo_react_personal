import Button from "../atoms/Button";

const CardButton = ({ title, onClick }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <h5 className="card-title">{title}</h5>
          <Button onClick={onClick} className="mt-3 w-100">
            Ir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardButton;
