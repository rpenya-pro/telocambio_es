import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "../../../ui/components/NotFound";
import AuthRoutes from "../../../ui/components/AuthRoutes";

// Uso de lazy loading
const HomePage = lazy(() => import("../../../ui/pages/HomePage"));
const RegisterComponent = lazy(
  () => import("../../../ui/components/RegisterComponent")
);
const LoginComponent = lazy(
  () => import("../../../ui/components/LoginComponent")
);

function AppRouter() {
  return (
    <BrowserRouter>
      {/* Encierra tus rutas en el componente Suspense y proporciona un fallback (por ejemplo, un componente de carga) */}
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="*" element={<NotFound />} />

          {/* Aquí utilizamos AuthRoutes para proteger rutas que requieren autenticación */}
          <Route path="/dashboard" element={<AuthRoutes />}>
            {/* Tus rutas protegidas van aquí, como subrutas */}
            {/* Por ejemplo: */}
            {/* <Route index element={<DashboardPage />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
