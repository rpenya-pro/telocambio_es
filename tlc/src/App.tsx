import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import AppRoutes from "./infrastructure/api/routes/AppRoutes";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./infrastructure/api/AuthProvider";
import ErrorBoundary from "./ui/components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

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
    <ErrorBoundary>
      <AuthProvider key={key}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
