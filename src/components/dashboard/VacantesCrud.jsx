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
import { auth, db } from "../../firebase/firebase";

const vacanteVacia = {
  titulo: "",
  cliente: "",
  ubicacion: "",
  estado: "Abierta",
};

const VacantesCrud = () => {
  const [vacantes, setVacantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState(vacanteVacia);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const q = query(collection(db, "vacantes"), orderBy("fechaCreacion", "desc"));
    const cancelarObservador = onSnapshot(
      q,
      (snapshot) => {
        setVacantes(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (error) => console.error("Error al escuchar vacantes:", error)
    );
    return () => cancelarObservador();
  }, []);

  const manejarCambio = (event) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const abrirNuevo = () => {
    setEditandoId(null);
    setFormulario(vacanteVacia);
  };

  const editar = (vacante) => {
    setEditandoId(vacante.id);
    setFormulario({
      titulo: vacante.titulo || "",
      cliente: vacante.cliente || "",
      ubicacion: vacante.ubicacion || "",
      estado: vacante.estado || "Abierta",
    });
  };

  const guardar = async (event) => {
    event.preventDefault();
    setMensaje("");

    if (formulario.titulo.trim() === "" || formulario.cliente.trim() === "") {
      setMensaje("Título y cliente son obligatorios.");
      return;
    }

    try {
      if (editandoId) {
        await updateDoc(doc(db, "vacantes", editandoId), { ...formulario });
        setMensaje("Vacante actualizada correctamente.");
      } else {
        const usuarioActual = auth.currentUser;
        await addDoc(collection(db, "vacantes"), {
          ...formulario,
          candidatos: 0,
          usuarioId: usuarioActual ? usuarioActual.uid : null,
          fechaCreacion: serverTimestamp(),
        });
        setMensaje("Vacante creada correctamente.");
      }
      abrirNuevo();
    } catch (error) {
      console.error("Error al guardar la vacante:", error);
      setMensaje("No se pudo guardar la vacante.");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta vacante?")) return;
    try {
      await deleteDoc(doc(db, "vacantes", id));
    } catch (error) {
      console.error("Error al eliminar la vacante:", error);
    }
  };

  const badgeClase = (estado) => {
    if (estado === "Abierta") return "badge abierta";
    if (estado === "Cerrada") return "badge cerrada";
    return "badge proceso";
  };

  const vacantesFiltradas = vacantes.filter((v) =>
    `${v.titulo} ${v.cliente} ${v.ubicacion}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container px-0 mt-5" id="vacantes">
      <h2>Gestión de Vacantes</h2>
      <hr />

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card p-4 border-0 shadow-sm rounded-4">
            <h5 className="mb-3">{editandoId ? "Editar vacante" : "Crear nueva vacante"}</h5>
            <form onSubmit={guardar}>
              <div className="mb-2">
                <label className="form-label">Título del cargo</label>
                <input
                  className="form-control"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Cliente</label>
                <input
                  className="form-control"
                  name="cliente"
                  value={formulario.cliente}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Ubicación</label>
                <input
                  className="form-control"
                  name="ubicacion"
                  value={formulario.ubicacion}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-control"
                  name="estado"
                  value={formulario.estado}
                  onChange={manejarCambio}
                >
                  <option value="Abierta">Abierta</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Cerrada">Cerrada</option>
                </select>
              </div>

              {mensaje && <p className="text-danger">{mensaje}</p>}

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-create px-4">
                  {editandoId ? "Guardar cambios" : "Crear vacante"}
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
                placeholder="Buscar por título, cliente o ubicación..."
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
          </div>

          <div className="table-card">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Cliente</th>
                  <th>Ubicación</th>
                  <th>Estado</th>
                  <th>Candidatos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vacantesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="6">No hay vacantes registradas todavía.</td>
                  </tr>
                )}
                {vacantesFiltradas.map((vacante) => (
                  <tr key={vacante.id}>
                    <td data-label="Título">
                      <span className="job-title">{vacante.titulo}</span>
                    </td>
                    <td data-label="Cliente">{vacante.cliente}</td>
                    <td data-label="Ubicación">{vacante.ubicacion}</td>
                    <td data-label="Estado">
                      <span className={badgeClase(vacante.estado)}>{vacante.estado}</span>
                    </td>
                    <td data-label="Candidatos">{vacante.candidatos ?? 0}</td>
                    <td data-label="Acciones">
                      <div className="actions-cell">
                        <i
                          className="fa-solid fa-pencil btn-action"
                          title="Editar"
                          onClick={() => editar(vacante)}
                        ></i>
                        <i
                          className="fa-solid fa-xmark btn-action"
                          title="Eliminar"
                          onClick={() => eliminar(vacante.id)}
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

export default VacantesCrud;
