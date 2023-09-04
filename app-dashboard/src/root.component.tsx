import { isAuthenticated } from "./auth/Auth";
import {
  Error404Component,
  ErrorProtectedComponent,
} from "@app-shared/react-shared";
import { DashboardMenu } from "./components/DashboardMenu";

export default function Root(props) {
  console.log("is authenticated desde dashboard", isAuthenticated());

  if (!isAuthenticated()) {
    return (
      <div>
        <ErrorProtectedComponent />
      </div>
    );
  } else {
    return (
      <>
        <div className="dashboard">
          <div className="row ">
            <DashboardMenu />
          </div>
          <div className="row landing__carousel">
            <div className="col-12">hola</div>
          </div>
          <div className="row landing__how">
            <div className="col-12">buenas tardes</div>
          </div>
          <div className="row landing__start">
            <div className="col-12">huenas noches</div>
          </div>
        </div>
      </>
    );
  }
}
