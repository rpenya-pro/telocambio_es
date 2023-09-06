import React from "react";
import { CarouselLanding } from "../components/CarouselLanding";
import { HowToLanding } from "../components/HowToLanding";
import { StartComponentLanding } from "../components/StartComponentLanding";
import { useValidateToken } from "@app-shared/react-hooks";

export const HomeLanding = () => {
  const isValid = useValidateToken(); // Aquí usamos el Hook

  if (isValid === null) {
    return <p>Validando...</p>;
  }
  return (
    <div className="landing">
      <div className="row landing__carousel">
        <div className="col-12">
          {!isValid ? "token no valido" : "token valido"}
          <CarouselLanding />
        </div>
      </div>
      <div className="row landing__how">
        <div className="col-12">
          <HowToLanding />
        </div>
      </div>
      <div className="row landing__start">
        <div className="col-12">
          <StartComponentLanding />
        </div>
      </div>
    </div>
  );
};
