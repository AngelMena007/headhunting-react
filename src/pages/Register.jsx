import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { registrarUsuarioAuth, actualizarPerfilAuth } from "../services/authService";
import { db } from "../firebase/firebase";
import logo from "../assets/imgs/Logo.png";

const Register = () => {
  // Paso 1
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  // Paso 2
  const [tipoPerfil, setTipoPerfil] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [nivelEstudio, setNivelEstudio] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const radioPaso1 = useRef(null);

  const navigate = useNavigate();

  // Validación antes de avanzar al paso 2 (equivalente al btn-siguiente-validar original)
  const validarPaso1 = (event) => {
    if (
      nombre.trim() === "" ||
      correo.trim() === "" ||
      password.trim() === "" ||
      telefono.trim() === ""
    ) {
      event.preventDefault();
      alert("Por favor, completa todos los campos obligatorios del Paso 1.");
      if (radioPaso1.current) radioPaso1.current.checked = true;
      return;
    }

    if (password.length < 6) {
      event.preventDefault();
      alert("La contraseña debe contener más de 6 dígitos. Por favor, inténtelo de nuevo.");
      if (radioPaso1.current) radioPaso1.current.checked = true;
      return;
    }
  };

  const finalizarRegistro = async (event) => {
    event.preventDefault();
    setMensaje("");

    try {
      setCargando(true);

      // 1. Crea el usuario en Firebase Authentication
      const credencialUsuario = await registrarUsuarioAuth(correo.trim(), password);

      // 2. Guarda el nombre dentro del perfil de Firebase
      await actualizarPerfilAuth({ displayName: nombre.trim() });

      // 3. Guarda el resto de la información del candidato en Firestore
      await addDoc(collection(db, "usuarios"), {
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        ciudadPais: ciudad.trim() || "No especificada",
        tipoPerfil: tipoPerfil || "No especificado",
        habilidades: habilidades.trim() || "Ninguna",
        nivelEstudio: nivelEstudio || "No especificado",
        estado: "Activo",
        uid: credencialUsuario.user.uid,
        fechaCreacion: serverTimestamp(),
      });

      alert(
        "¡Registro completado exitosamente!\nYa puedes iniciar sesión con tu correo y la contraseña que acabas de crear."
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al registrar:", error);

      if (error.code === "auth/email-already-in-use") {
        setMensaje("El correo electrónico ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        setMensaje("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setMensaje("La contraseña es demasiado débil.");
      } else if (error.code === "auth/network-request-failed") {
        setMensaje("No se pudo conectar con Firebase.");
      } else {
        setMensaje("No se pudo registrar al usuario.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-page">
      <header className="header-principal">
        <div className="espaciador-izquierda"></div>
        <div className="seccion-registro">
          <div className="barra-registro">REGISTRO</div>
        </div>
        <div className="logo-area-derecha">
          <div className="texto-logo-mini"></div>
          <Link to="/">
            <img src={logo} alt="Logo" className="img-mini" />
          </Link>
        </div>
      </header>

      <div className="linea-azul-separadora"></div>

      <main>
        <form className="main-container" id="registro-form" onSubmit={finalizarRegistro}>
          <input type="radio" name="pasos" id="paso1" ref={radioPaso1} defaultChecked style={{ display: "none" }} />
          <input type="radio" name="pasos" id="paso2" style={{ display: "none" }} />

          <div className="seccion-form" id="contenido-paso1">
            <h2 className="titulo-seccion">1. Información Personal</h2>
            <div className="grid-campos">
              <div className="campo">
                <label htmlFor="reg-nombre">Nombre completo:</label>
                <input
                  type="text"
                  id="reg-nombre"
                  placeholder="Ej: Sebastian Villagomez"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  required
                />
              </div>
              <div className="campo">
                <label htmlFor="reg-correo">Correo electrónico:</label>
                <input
                  type="email"
                  id="reg-correo"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="reg-password">Nueva contraseña:</label>
                <input
                  type="password"
                  id="reg-password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "10px",
                    width: "95%",
                    outline: "none",
                  }}
                />
              </div>

              <div className="campo">
                <label htmlFor="reg-telefono">Número de teléfono:</label>
                <input
                  type="text"
                  id="reg-telefono"
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                  required
                />
              </div>
              <div className="campo">
                <label htmlFor="reg-ciudad">Ciudad/País:</label>
                <input
                  type="text"
                  id="reg-ciudad"
                  placeholder="Quito/Ecuador"
                  value={ciudad}
                  onChange={(event) => setCiudad(event.target.value)}
                />
              </div>
            </div>

            <div className="btn-container">
              <label htmlFor="paso2" className="btn-fake" id="btn-siguiente-validar" onClick={validarPaso1}>
                Siguiente
              </label>
            </div>
          </div>

          <div className="seccion-form" id="contenido-paso2">
            <h2 className="titulo-seccion">2. Perfil Profesional</h2>
            <div className="grid-campos">
              <div className="campo">
                <label>Tipo de Perfil:</label>
                <div className="opciones-radio">
                  <input
                    type="radio"
                    name="perfil"
                    value="Administrativo"
                    onChange={(event) => setTipoPerfil(event.target.value)}
                  />
                  Administrativo
                  <br />
                  <input
                    type="radio"
                    name="perfil"
                    value="Empleador"
                    onChange={(event) => setTipoPerfil(event.target.value)}
                  />
                  Empleador
                  <br />
                  <input
                    type="radio"
                    name="perfil"
                    value="Empleado"
                    onChange={(event) => setTipoPerfil(event.target.value)}
                  />{" "}
                  Empleado
                </div>
              </div>
              <div className="campo">
                <label htmlFor="reg-habilidades">Habilidades:</label>
                <input
                  type="text"
                  id="reg-habilidades"
                  placeholder="Ej: C++, Java, Linux"
                  value={habilidades}
                  onChange={(event) => setHabilidades(event.target.value)}
                />
              </div>
              <div className="campo">
                <label htmlFor="archivo-cv">C.V / Fotografía:</label>
                <div className="cv-placeholder">
                  <input type="file" id="archivo-cv" style={{ display: "none" }} />
                  <label htmlFor="archivo-cv" className="upload-area">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                      width="60"
                      alt="Subir archivo"
                    />
                    <span className="upload-text">Haz clic para subir archivo</span>
                  </label>
                </div>
              </div>
              <div className="campo">
                <label>Nivel de estudio:</label>
                <div className="opciones-radio">
                  <input
                    type="radio"
                    name="estudio"
                    value="Escuela"
                    onChange={(event) => setNivelEstudio(event.target.value)}
                  />
                  Escuela
                  <br />
                  <input
                    type="radio"
                    name="estudio"
                    value="Colegio"
                    onChange={(event) => setNivelEstudio(event.target.value)}
                  />
                  Colegio
                  <br />
                  <input
                    type="radio"
                    name="estudio"
                    value="Universidad"
                    onChange={(event) => setNivelEstudio(event.target.value)}
                  />
                  Universidad
                </div>
              </div>
            </div>

            {mensaje && <p style={{ color: "#c0392b", fontWeight: "bold" }}>{mensaje}</p>}

            <div className="btn-container">
              <label htmlFor="paso1" className="btn-regresar">
                ← Volver
              </label>
              <button type="submit" className="btn-enviar" id="btn-finalizar" disabled={cargando}>
                {cargando ? "Registrando..." : "Finalizar Registro"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;
