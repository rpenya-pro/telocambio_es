import { CarouselLanding } from "./components/CarouselLanding";
import { connectToDB } from "./auth/Auth"; // Asegúrate de ajustar esta importación a tu estructura de carpetas

import { HowToLanding } from "./components/HowToLanding";
import { StartComponentLanding } from "./components/StartComponentLanding";
import { isAuthenticated } from "./auth/Auth";
import { Error404Component } from "@app-shared/react-shared";

export default function Root(props) {
  if (isAuthenticated()) {
    return (
      <div>
        <Error404Component />
      </div>
    );
  } else {
    return (
      <>
        <div className="landing">
          <div className="row landing__carousel">
            <div className="col-12">
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
      </>
    );
  }
}
