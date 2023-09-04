import React, { useState } from "react";
import { authenticate } from "./Auth";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    try {
      const { success, message } = await authenticate(email, password);
      if (success) {
        closeModal(); // Cierra el modal
        window.location.href = "http://localhost:9000/dashboard";
      } else {
        setError(message);
      }
    } catch (error) {
      console.error("Ocurrió un error durante la autenticación", error);
      setError("Ocurrió un error inesperado");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
