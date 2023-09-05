import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { isAuthenticated } from "./auth/Auth";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { Dashboard } from "./pages/Dashboard";
import { useNavigate } from "react-router-dom";

export default function Root(props) {
  return (
    <Router>
      {/* Aquí es donde definirás tus rutas */}
      <Routes>
        {/* <Route path="/another">
            <AnotherPage />
          </Route> */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}
