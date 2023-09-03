import React from "react";
import { duoLibros, duoRopa } from "../assets/images";

export const HowToLanding = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12 mt-5"></div>
      </div>
      <div className="row mt-5">
        <div className="col-md-5 mt-5 ps-5 pe-5">
          <div className="ps-5 pe-5">
            <img src={duoLibros} alt="duoLibros" className="landing__icon-1" />
          </div>
        </div>
        <div className="col-md-7 mt-5">
          <div>
            <h3>¿Qué puedo intercambiar aquí?</h3>
            <p className="mt-4">
              Es sencillo, cosas tangibles, habilidades... por ejemplo, tus
              vinilos, tus libros, algunas prendas de ropa...
            </p>
            <p>
              Se te da bien dibujar? los idiomas? el macramé o el punto? puedes
              intercambiar tus habilidades conectando con otras personas que
              tengan algo que cambiar.
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 mt-5"></div>
      </div>
      <div className="row mt-5">
        <div className="col-md-5  ps-5 pe-5">
          <div className="ps-5 pe-5">
            <img src={duoRopa} alt="duoRopa" className="landing__icon-1" />
          </div>
        </div>
        <div className="col-md-7 pe-4">
          <div>
            <h3>¿Cuánto cuesta?</h3>
            <p className="mt-4">
              No cuesta nada. No hay ninguna transacción comercial entre la
              gente que conecta.
            </p>
            <p>
              La manera en la que llevarás a cabo el intercambio depende de ti,
              solo conecta y el resto es sencillo.
            </p>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12 mb-5"></div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12 mb-5"></div>
      </div>
    </div>
  );
};
