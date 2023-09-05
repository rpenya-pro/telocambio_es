import React, { useEffect, useState } from "react";
import { munyeca } from "../assets/images";
import { useNavigate } from "react-router-dom"; // Importa useHistory

export const ErrorProtectedComponent = () => {
  // const [redirectToHome, setRedirectToHome] = useState(false);
  // const history = useNavigate(); // Obtén el objeto history

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setRedirectToHome(true);
  //   }, 6000);

  //   return () => clearTimeout(timeout);
  // }, []);

  // // Redirige si redirectToHome es true
  // if (redirectToHome) {
  //   history("/");
  // }

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
