import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { cerrarSesionAuth } from "../services/authService";
import logo from "../assets/imgs/Logo.png";
import dash1 from "../assets/imgs/dash1.png";
import dash2 from "../assets/imgs/dash2.png";
import dash3 from "../assets/imgs/dash3.png";
import dash4 from "../assets/imgs/dash4.png";
import UsuariosCrud from "../components/dashboard/UsuariosCrud";
import VacantesCrud from "../components/dashboard/VacantesCrud";
import PerfilPanel from "../components/dashboard/PerfilPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = auth.currentUser;

  // Función corregida para redirigir a la landing page ("/")
  const cerrarSesion = async () => {
    try {
      await cerrarSesionAuth();
      navigate("/"); // <-- Cambio de "/login" a "/"
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para manejar el scroll manual sin romper el HashRouter
  const handleScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        className="btn btn-outline-dark d-md-none position-fixed top-0 start-0 m-3 z-3 shadow-sm"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menuLateral"
      >
        <i className="fa-solid fa-bars fs-4"></i>
      </button>

      <div className="d-flex">
        <div
          className="offcanvas-md offcanvas-start d-flex flex-column flex-shrink-0 p-3 bg-white text-dark border-end position-sticky top-0"
          id="menuLateral"
          style={{ width: "280px", height: "100vh" }}
        >
          {/* Cambiamos href="/" por onClick redirigiendo al inicio */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="d-flex flex-column align-items-center justify-content-center text-center my-3 text-decoration-none text-dark"
          >
            <img src={logo} alt="Logo HeadHunting" width="130" height="80" className="mb-2" />
          </a>
          <hr className="mt-0" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#panel-principal" onClick={(e) => handleScroll(e, 'panel-principal')} className="nav-link active" aria-current="page">
                Panel Principal
              </a>
            </li>
            <li>
              <a href="#candidatos" onClick={(e) => handleScroll(e, 'candidatos')} className="nav-link text-dark">
                Candidatos (Usuarios)
              </a>
            </li>
            <li>
              <a href="#vacantes" onClick={(e) => handleScroll(e, 'vacantes')} className="nav-link text-dark">
                Vacantes
              </a>
            </li>
            <li>
              <a href="#configuracion" onClick={(e) => handleScroll(e, 'configuracion')} className="nav-link text-dark">
                Configuración
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()} // Prevenimos el salto de página en el dropdown
              className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center me-2" style={{ width: 32, height: 32 }}>
                {(usuario?.displayName || usuario?.email || "U").charAt(0).toUpperCase()}
              </span>
              <strong>{usuario?.displayName || "Perfil"}</strong>
            </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
              <li>
                <button className="dropdown-item" type="button" onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow-1 p-4 bg-light text-dark" style={{ minHeight: "100vh" }}>
          <header className="mb-4 pt-5 pt-md-0" id="panel-principal">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Panel Principal</h2>
              <span>
                Bienvenido, <strong>{usuario?.displayName || usuario?.email}</strong>
              </span>
            </div>
            <hr />
          </header>

          <main className="servicios" id="servicios">
            <div className="servicios-container">
              <div className="servicios-tarjeta">
                <h2 className="servicios-subtitulo">Total de Candidatos Registrados</h2>
                <div className="servicios-tarjeta-texto-imagen">
                  <h1 className="servicios-texto">+ 2 534</h1>
                  <br />
                  <img src={dash1} alt="Candidatos" className="servicios-img" />
                </div>
                <h2 className="subtitulo2">respecto al mes anterior</h2>
              </div>
              <div className="servicios-tarjeta">
                <h2 className="servicios-subtitulo">Vacantes Directivas Abiertas</h2>
                <div className="servicios-tarjeta-texto-imagen">
                  <h1 className="servicios-texto">45</h1>
                  <br />
                  <img src={dash2} alt="Vacantes" className="servicios-img" />
                </div>
                <h2 className="subtitulo2">Roles Activos</h2>
              </div>
              <div className="servicios-tarjeta">
                <h2 className="servicios-subtitulo">Entrevistas Programadas Hoy</h2>
                <div className="servicios-tarjeta-texto-imagen">
                  <h1 className="servicios-texto">18</h1>
                  <br />
                  <img src={dash3} alt="Entrevistas" className="servicios-img" />
                </div>
                <h2 className="subtitulo2">Simulaciones y Clientes</h2>
              </div>
              <div className="servicios-tarjeta">
                <h2 className="servicios-subtitulo">Candidatos Colocados Exitosamente</h2>
                <div className="servicios-tarjeta-texto-imagen">
                  <h1 className="servicios-texto">112</h1>
                  <br />
                  <img src={dash4} alt="Colocados" className="servicios-img" />
                </div>
                <h2 className="subtitulo2">Tasa de Éxito 85%</h2>
              </div>
            </div>
          </main>

          <UsuariosCrud />
          <VacantesCrud />
          <PerfilPanel />
        </div>
      </div>
    </>
  );
};

export default Dashboard;