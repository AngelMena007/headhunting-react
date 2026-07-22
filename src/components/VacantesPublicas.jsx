import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const VacantesPublicas = () => {
  const [vacantes, setVacantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerVacantes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vacantes"));
        const listaVacantes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVacantes(listaVacantes);
      } catch (error) {
        console.error("Error al obtener vacantes:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerVacantes();
  }, []);

  return (
    <section className="container py-5" id="vacantes-publicas" style={{ marginBottom: "4rem" }}>
      <div className="text-center mb-5">
        <h1 className="titulo" style={{ fontSize: "2.5rem", color: "#003366", marginBottom: "1rem" }}>VACANTES DISPONIBLES</h1>
        <p className="text-muted">Explora las oportunidades laborales que tenemos para ti.</p>
      </div>

      {cargando ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : vacantes.length === 0 ? (
        <p className="text-center text-muted">Por el momento no hay vacantes publicadas.</p>
      ) : (
        <div className="row g-4 justify-content-center">
          {vacantes.map((vacante) => (
            <div className="col-md-4" key={vacante.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold" style={{ color: "#0056b3" }}>{vacante.titulo || "Vacante"}</h4>
                  <h6 className="card-subtitle mb-3 text-muted">
                    📍 {vacante.ubicacion || "Remoto / Presencial"}
                  </h6>
                  <p className="card-text text-secondary">
                    {vacante.descripcion ? vacante.descripcion.substring(0, 100) + "..." : "Sin detalles adicionales."}
                  </p>
                  {vacante.modalidad && (
                    <span className="badge bg-white text-dark border mt-2 px-3 py-2 rounded-pill">
                      {vacante.modalidad}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VacantesPublicas;