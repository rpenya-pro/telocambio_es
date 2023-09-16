import { useAuth } from "../../hooks/useAuth";

/**
 * Página inicial del dashboard o área privada
 * @returns
 */
export const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  return <>{isAuthenticated ? <>autenticado</> : <>NO autneticado</>}</>;
};
