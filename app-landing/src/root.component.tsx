import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { CarouselLanding } from "./components/CarouselLanding";
import { HowToLanding } from "./components/HowToLanding";
import { StartComponentLanding } from "./components/StartComponentLanding";
import { isAuthenticated } from "./auth/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeLanding } from "./pages/HomeLanding";

export default function Root(props) {
  return <HomeLanding />;

  // const MainComponent: React.FC = () => {
  //   const navigate = useNavigate();

  //   return (
  //     <div className="landing">
  //       <div className="row landing__carousel">
  //         <div className="col-12">
  //           <CarouselLanding />
  //         </div>
  //       </div>
  //       <div className="row landing__how">
  //         <div className="col-12">
  //           <HowToLanding />
  //         </div>
  //       </div>
  //       <div className="row landing__start">
  //         <div className="col-12">
  //           <StartComponentLanding />
  //         </div>
  //       </div>
  //     </div>
  //   );
}
