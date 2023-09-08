import React from "react";
import { CarouselLanding } from "../components/CarouselLanding";
import { HowToLanding } from "../components/HowToLanding";
import { StartComponentLanding } from "../components/StartComponentLanding";
import { useValidateToken } from "teloc-hooks";

export const HomeLanding = () => {
  const isValid = useValidateToken();

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
