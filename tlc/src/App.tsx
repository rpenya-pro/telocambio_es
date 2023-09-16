import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import AppRoutes from "./infrastructure/api/routes/AppRoutes";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./infrastructure/api/AuthProvider";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Merriweather"],
      },
    });
  }, []);

  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <AuthProvider key={key}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
