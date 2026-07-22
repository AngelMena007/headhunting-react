import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const PrivateRoute = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
    });

    return () => cancelarObservador();
  }, []);

  if (cargando) {
    return <p style={{ textAlign: "center", marginTop: "5rem" }}>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
