import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/Logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (e, id) => {
    // 1. Evitamos el comportamiento por defecto para que HashRouter no se confunda
    e.preventDefault();

    // 2. Comprobamos si no estamos en la página de inicio
    if (location.pathname !== "/") {
      navigate("/"); // Redirigimos al inicio
      // Damos un pequeño respiro de 100ms para que la página cargue antes de bajar
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // 3. Si ya estamos en el inicio, hacemos scroll directamente
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="contenedor">
        <div className="zona-izquierda">
          <Link to="/">
            <img src={logo} className="imagen-logo" alt="Logo HeadHunting" />
          </Link>
        </div>
        
        <div className="zona-centro">
          <nav className="menu">
            {/* Agregamos el evento onClick a cada enlace */}
            <a href="#inicio" onClick={(e) => handleScroll(e, 'inicio')}>Inicio</a>
            <a href="#nosotros" onClick={(e) => handleScroll(e, 'nosotros')}>Nosotros</a>
            <a href="#servicios" onClick={(e) => handleScroll(e, 'servicios')}>Servicios</a>
            <a href="#reseñas" onClick={(e) => handleScroll(e, 'reseñas')}>Reseñas</a>
            <a href="#contactanos" onClick={(e) => handleScroll(e, 'contactanos')}>Contáctanos</a>
          </nav>
        </div>

        <div className="zona-derecha">
          <Link to="/login" className="boton">
            <span>
              <strong>Login</strong>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;