import React, { useState } from "react";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  return <></>;
  // const [username, setUsername] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string | null>(null);

  // const handleLogin = (): void => {
  //   const { success, message } = authenticate(username, password);
  //   if (success) {
  //     closeModal(); // Cierra el modal
  //     window.location.href = "http://localhost:9000/dashboard";
  //   } else {
  //     setError(message);
  //   }
  // };

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Username"
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <button onClick={handleLogin}>Login</button>
  //     {error && <p>{error}</p>}
  //   </div>
  // );
};

export default Login;
