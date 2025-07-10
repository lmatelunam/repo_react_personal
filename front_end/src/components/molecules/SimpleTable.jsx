import React from "react";
import Button from "../atoms/Button";

const SimpleTable = ({
  columnas = [],
  datos = [],
  rowKey,
  renderFila,
}) => {
  return (
    <div className="table-responsive mb-3">
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            {columnas.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item[rowKey]}>
              {renderFila(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
