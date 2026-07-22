import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { actualizarPasswordAuth, actualizarPerfilAuth } from "../../services/authService";

const PerfilPanel = () => {
  const usuario = auth.currentUser;

  const [nombre, setNombre] = useState(usuario?.displayName || "");
  const [mensajePerfil, setMensajePerfil] = useState("");
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);

  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");
  const [guardandoPassword, setGuardandoPassword] = useState(false);

  const guardarPerfil = async (event) => {
    event.preventDefault();
    setMensajePerfil("");

    if (nombre.trim() === "") {
      setMensajePerfil("El nombre no puede estar vacío.");
      return;
    }

    try {
      setGuardandoPerfil(true);
      await actualizarPerfilAuth({ displayName: nombre.trim() });
      setMensajePerfil("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMensajePerfil("No se pudo actualizar el perfil.");
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const actualizarPassword = async (event) => {
    event.preventDefault();
    setMensajePassword("");

    if (passwordNueva.length < 6) {
      setMensajePassword("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (passwordNueva !== passwordConfirmar) {
      setMensajePassword("Las contraseñas no coinciden.");
      return;
    }

    try {
      setGuardandoPassword(true);
      await actualizarPasswordAuth(passwordNueva);
      setMensajePassword("Contraseña actualizada correctamente.");
      setPasswordNueva("");
      setPasswordConfirmar("");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      if (error.code === "auth/requires-recent-login") {
        setMensajePassword(
          "Por seguridad, vuelve a iniciar sesión antes de cambiar la contraseña."
        );
      } else {
        setMensajePassword("No se pudo actualizar la contraseña.");
      }
    } finally {
      setGuardandoPassword(false);
    }
  };

  return (
    <div className="container px-0 mt-5" id="configuracion">
      <h2>Configuración de Perfil</h2>
      <hr />

      <div className="card p-4 border-0 shadow-sm rounded-4 mb-4">
        <h4 className="mb-3">Información del Perfil</h4>
        <div className="perfil">
          <div className="foto">
            <div className="circulo">👤</div>
          </div>
          <form className="formulario flex-grow-1" onSubmit={guardarPerfil}>
            <div className="grupo mb-3">
              <label className="fw-semibold mb-1">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>
            <div className="grupo mb-3">
              <label className="fw-semibold mb-1">Correo Electrónico</label>
              <input type="email" className="form-control" value={usuario?.email || ""} disabled />
            </div>

            {mensajePerfil && <p className="text-info">{mensajePerfil}</p>}

            <div className="d-flex justify-content-end gap-3 mt-2">
              <button type="submit" className="btn btn-create px-4" disabled={guardandoPerfil}>
                {guardandoPerfil ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card p-4 border-0 shadow-sm rounded-4">
        <h4 className="mb-3">Actualizar Contraseña</h4>
        <form onSubmit={actualizarPassword}>
          <div className="grupo mb-3">
            <label className="fw-semibold mb-1">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={passwordNueva}
              onChange={(event) => setPasswordNueva(event.target.value)}
            />
          </div>
          <div className="grupo mb-3">
            <label className="fw-semibold mb-1">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirmar}
              onChange={(event) => setPasswordConfirmar(event.target.value)}
            />
          </div>

          {mensajePassword && <p className="text-info">{mensajePassword}</p>}

          <div className="d-flex justify-content-end gap-3 mt-2">
            <button type="submit" className="btn btn-create px-4" disabled={guardandoPassword}>
              {guardandoPassword ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilPanel;
