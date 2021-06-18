import { useState } from "react";

export default function useAuthProvider() {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  return {
    token,
    setToken, 
    usuario,
    setUsuario
  };
}