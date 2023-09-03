import React from "react";

export const StartComponentLanding = () => {
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <hr />
        <div className="col-12 mt-5 mb-5">
          <div>
            <h3>Vale, ¿qué tengo que hacer?</h3>
            <p className="mt-4">
              Regístrate y sube tus cosas o habilidades. Ya está.
            </p>
            <p>
              En tu area de usuario podrás configurar tu privacidad y tus datos.
              Cuando alguien busque algo que tú tengas, aparecerá en la
              búsqueda, la persona contactará contigo a través de esta
              aplicación y podréisrealizar el intercambio como queráis.
            </p>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12 text-center mb-5">
          <div>
            <button className="btn landing__big-button-primary">
              ¡Intercambia ahora!
            </button>
          </div>

          <div className="mt-4">
            <h6>
              Si ya estás registrada/o, puedes acceder a tu cuenta{" "}
              <a href="#" className="landing__link-context">
                aquí.
              </a>
            </h6>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
