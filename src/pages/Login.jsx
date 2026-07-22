import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iniciarSesionAuth } from "../services/authService";
import loginImg from "../assets/imgs/login.png";

const Login = () => {
  // Estados para guardar los datos del formulario
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  // Estado para mostrar mensajes
  const [mensaje, setMensaje] = useState("");
  // Estado para controlar el botón mientras Firebase responde
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (event) => {
    event.preventDefault();
    setMensaje("");

    if (correo.trim() === "" || password.trim() === "") {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      setCargando(true);
      // Inicia sesión con Firebase Authentication
      await iniciarSesionAuth(correo.trim(), password);
      // Si las credenciales son correctas, redirecciona al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setMensaje("Correo o contraseña incorrectos.");
      } else if (error.code === "auth/invalid-email") {
        setMensaje("El correo electrónico no es válido.");
      } else if (error.code === "auth/too-many-requests") {
        setMensaje("Demasiados intentos. Inténtelo nuevamente más tarde.");
      } else if (error.code === "auth/network-request-failed") {
        setMensaje("No se pudo conectar con Firebase.");
      } else {
        setMensaje("No se pudo iniciar sesión.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
    <div className="login-box">
      <div className="form-container">
        <h2 className="logo">
          <img src={loginImg} width="150" height="100" alt="Login" />
        </h2>
        <form id="login-form" onSubmit={iniciarSesion}>
          <div className="input-box">
            <i className="fa-solid fa-user"></i>
            <input
              type="email"
              id="login-email"
              placeholder="Correo Electronico"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              id="login-password"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {mensaje && (
            <p className="link" style={{ color: "#c0392b" }}>
              {mensaje}
            </p>
          )}

          <div className="options">
            <label>
              <input
                type="checkbox"
                id="login-remember"
                checked={recordarme}
                onChange={(event) => setRecordarme(event.target.checked)}
              />
              Recordarme
            </label>
            <button type="submit" id="btn-login" disabled={cargando}>
              {cargando ? "Ingresando..." : "Iniciar Sesion"}
            </button>
          </div>
        </form>
        <hr />
        <p className="link">
          ¿No tienes cuenta?{" "}
          <span>
            <Link to="/registro" style={{ color: "black", textDecoration: "underline" }}>
              Regístrate aquí
            </Link>
          </span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
