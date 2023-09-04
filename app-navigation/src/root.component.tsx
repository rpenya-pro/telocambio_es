import HeaderNavBar from "./components/HeaderNavBar";
import { isAuthenticated, logout } from "./auth/Auth";
import {
  Error404Component,
  ErrorProtectedComponent,
} from "@app-shared/react-shared";

export default function Root(props) {
  return (
    <>
      <div className="container">
        <HeaderNavBar authenticated={isAuthenticated()} logout={logout} />
      </div>
    </>
  );
}
