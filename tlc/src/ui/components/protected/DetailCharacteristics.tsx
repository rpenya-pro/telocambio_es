import React from "react";
import { Thread } from "../../../interfaces";

interface DetailProps {
  dataByType: Thread;
}

export const DetailCharacteristics: React.FC<DetailProps> = ({
  dataByType,
}) => {
  let DetailComponent;

  if (!dataByType.typeOfThread) return null;

  switch (dataByType?.typeOfThread) {
    case "isBook":
      DetailComponent = <DetailIsBook dataByType={dataByType} />;
      break;
    case "isComic":
      DetailComponent = <DetailIsComic dataByType={dataByType} />;
      break;
    case "isVynil":
      DetailComponent = <DetailIsVynil dataByType={dataByType} />;
      break;
    case "isOther":
      DetailComponent = <DetailIsOther />;
      break;
    case "isDress":
      DetailComponent = <DetailIsDress dataByType={dataByType} />;
      break;
    default:
      DetailComponent = <div>No se encuentra el tipo</div>;
      break;
  }

  return <>{DetailComponent}</>;
};

const DetailIsBook: React.FC<DetailProps> = ({ dataByType }) => {
  return (
    <>
      <div className="card p-3">
        <h5>Características:</h5>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Autor: {dataByType.author || ""}</li>
              <li>Editorial: {dataByType.editorial || ""}</li>
              <li>ISBN: {dataByType.isbn || ""}</li>
              <li>Año edición: {dataByType.yearEdition || ""}</li>
              <li>Número edición: {dataByType.numberEdition || ""}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>
                Disponibilidad:
                {dataByType?.closedTransaction ? "No disponible" : "Disponible"}
              </li>
              <li>Estado: {dataByType?.qualityStatus}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailIsComic: React.FC<DetailProps> = ({ dataByType }) => {
  return (
    <>
      <div className="card p-3">
        <h5>Características:</h5>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Autor: {dataByType.author || ""}</li>
              <li>Editorial: {dataByType.editorial || ""}</li>
              <li>ISBN: {dataByType.isbn || ""}</li>
              <li>Año edición: {dataByType.yearEdition || ""}</li>
              <li>Número edición: {dataByType.numberEdition || ""}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>
                Disponibilidad:
                {dataByType?.closedTransaction ? "No disponible" : "Disponible"}
              </li>
              <li>Estado: {dataByType?.qualityStatus}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailIsVynil: React.FC<DetailProps> = ({ dataByType }) => {
  return (
    <>
      <div className="card p-3">
        <h5>Características:</h5>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Artista: {dataByType.author || ""}</li>
              <li>Discográfica: {dataByType.editorial || ""}</li>
              <li>Año de publicación: {dataByType.yearEdition || ""}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>
                Disponibilidad:
                {dataByType?.closedTransaction ? "No disponible" : "Disponible"}
              </li>
              <li>Estado: {dataByType?.qualityStatus}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailIsOther = () => {
  return <></>;
};

const DetailIsDress: React.FC<DetailProps> = ({ dataByType }) => {
  return (
    <>
      <div className="card p-3">
        <h5>Características:</h5>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Material: {dataByType.author || ""}</li>
              <li>Talla: {dataByType.editorial || ""}</li>
              <li>Marca: {dataByType.isbn || ""}</li>
              <li>Categoría de la prenda: {dataByType.yearEdition || ""}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>
                Disponibilidad:{" "}
                {dataByType?.closedTransaction ? "No disponible" : "Disponible"}
              </li>
              <li>Estado: {dataByType?.qualityStatus}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
