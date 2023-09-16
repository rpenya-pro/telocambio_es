import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import RegisterComponent from "./ui/components/RegisterComponent";
import { SessionProvider } from "./ui/contexts/SessionContext";
import AppRouter from "./infrastructure/api/routes/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
