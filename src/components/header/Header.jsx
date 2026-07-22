import { Link } from "react-router-dom";
import logo from "../../assets/imgs/Logo.png";

const Header = () => {
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
            <a href="#inicio">Inicio</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#servicios">Servicios</a>
            <a href="#reseñas">Reseñas</a>
            <a href="#contactanos">Contáctanos</a>
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
