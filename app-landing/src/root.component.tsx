import { CarouselLanding } from "./components/CarouselLanding";
import { HowToLanding } from "./components/HowToLanding";
import { StartComponentLanding } from "./components/StartComponentLanding";

export default function Root(props) {
  return (
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
  );
}
