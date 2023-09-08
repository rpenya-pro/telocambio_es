import HeaderNavBar from "./components/HeaderNavBar";
import { ErrorProtectedComponent } from "@app-shared/react-shared";

export default function Root(props) {
  return (
    <>
      <div className="container">
        <HeaderNavBar />
      </div>
    </>
  );
}
