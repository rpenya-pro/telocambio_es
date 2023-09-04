import React from "react";
import { munyeca } from "../assets/images";

export const ErrorProtectedComponent = () => {
  return (
    <div className="container-fluid shared">
      <div className="row">
        <div className="col-md-12 text-center shared__protected--container d-flex align-items-center justify-content-center flex-column">
          <div>
            <h4>
              El contenido al que desea acceder no está disponible, por favor,
              consulte con el administrador del website.
            </h4>
          </div>
          <div className="mt-5">
            <img src={munyeca} alt="duoLibros" className="shared__munyeca" />
          </div>
        </div>
      </div>
    </div>
  );
};
