import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const usuarioVacio = {
  nombre: "",
  correo: "",
  telefono: "",
  ciudadPais: "",
  tipoPerfil: "",
  estado: "Activo",
};

const UsuariosCrud = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState(usuarioVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const q = query(collection(db, "usuarios"), orderBy("fechaCreacion", "desc"));
    const cancelarObservador = onSnapshot(
      q,
      (snapshot) => {
        setUsuarios(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (error) => console.error("Error al escuchar usuarios:", error)
    );
    return () => cancelarObservador();
  }, []);

  const manejarCambio = (event) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const abrirNuevo = () => {
    setEditandoId(null);
    setFormulario(usuarioVacio);
  };

  const editar = (usuario) => {
    setEditandoId(usuario.id);
    setFormulario({
      nombre: usuario.nombre || "",
      correo: usuario.correo || "",
      telefono: usuario.telefono || "",
      ciudadPais: usuario.ciudadPais || "",
      tipoPerfil: usuario.tipoPerfil || "",
      estado: usuario.estado || "Activo",
    });
  };

  const guardar = async (event) => {
    event.preventDefault();
    setMensaje("");

    if (formulario.nombre.trim() === "" || formulario.correo.trim() === "") {
      setMensaje("Nombre y correo son obligatorios.");
      return;
    }

    try {
      if (editandoId) {
        await updateDoc(doc(db, "usuarios", editandoId), { ...formulario });
        setMensaje("Candidato actualizado correctamente.");
      } else {
        await addDoc(collection(db, "usuarios"), {
          ...formulario,
          fechaCreacion: serverTimestamp(),
        });
        setMensaje("Candidato registrado correctamente.");
      }
      abrirNuevo();
    } catch (error) {
      console.error("Error al guardar el candidato:", error);
      setMensaje("No se pudo guardar el candidato.");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este candidato?")) return;
    try {
      await deleteDoc(doc(db, "usuarios", id));
    } catch (error) {
      console.error("Error al eliminar el candidato:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.correo} ${u.ciudadPais}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container px-0 mt-5" id="candidatos">
      <h2>Gestión de Candidatos (Usuarios)</h2>
      <hr />

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card p-4 border-0 shadow-sm rounded-4">
            <h5 className="mb-3">{editandoId ? "Editar candidato" : "Añadir nuevo candidato"}</h5>
            <form onSubmit={guardar}>
              <div className="mb-2">
                <label className="form-label">Nombre completo</label>
                <input
                  className="form-control"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Correo electrónico</label>
                <input
                  className="form-control"
                  type="email"
                  name="correo"
                  value={formulario.correo}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Teléfono</label>
                <input
                  className="form-control"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Ciudad/País</label>
                <input
                  className="form-control"
                  name="ciudadPais"
                  value={formulario.ciudadPais}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Tipo de perfil</label>
                <select
                  className="form-control"
                  name="tipoPerfil"
                  value={formulario.tipoPerfil}
                  onChange={manejarCambio}
                >
                  <option value="">Seleccione</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Empleador">Empleador</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-control"
                  name="estado"
                  value={formulario.estado}
                  onChange={manejarCambio}
                >
                  <option value="Activo">Activo</option>
                  <option value="Evaluado">Evaluado</option>
                  <option value="Entrevistando">Entrevistando</option>
                  <option value="Colocado">Colocado</option>
                </select>
              </div>

              {mensaje && <p className="text-danger">{mensaje}</p>}

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-create px-4">
                  {editandoId ? "Guardar cambios" : "Registrar"}
                </button>
                {editandoId && (
                  <button type="button" className="btn btn-light px-4" onClick={abrirNuevo}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="actions-bar">
            <div className="search-container">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre, correo o ciudad..."
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
          </div>

          <div className="table-card">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Correo</th>
                  <th>Perfil</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="5">No hay candidatos registrados todavía.</td>
                  </tr>
                )}
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td data-label="Candidato">
                      <span className="job-title">{usuario.nombre}</span>
                    </td>
                    <td data-label="Correo">{usuario.correo}</td>
                    <td data-label="Perfil">{usuario.tipoPerfil || "-"}</td>
                    <td data-label="Estado">
                      <span className="badge proceso">{usuario.estado || "Activo"}</span>
                    </td>
                    <td data-label="Acciones">
                      <div className="actions-cell">
                        <i
                          className="fa-solid fa-pencil btn-action"
                          title="Editar"
                          onClick={() => editar(usuario)}
                        ></i>
                        <i
                          className="fa-solid fa-xmark btn-action"
                          title="Eliminar"
                          onClick={() => eliminar(usuario.id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosCrud;
