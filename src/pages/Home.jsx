import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import imagenMain from "../assets/imgs/Imagen Main.png";
import servicio1 from "../assets/imgs/servicio1.jpg";
import servicio2 from "../assets/imgs/servicio2.jpeg";
import servicio3 from "../assets/imgs/servicio3.jpg";
import mujer1 from "../assets/imgs/mujer1.jpg";
import mujer2 from "../assets/imgs/mujer2.jpg";
import hombre from "../assets/imgs/hombre.png";

const Home = () => {
  return (
    <div className="home-page">
      <Header />

      <main className="main" id="inicio">
        <div className="container-main">
          <div className="main-texto">
            <h1>IMAGINA TU SIGUIENTE GRAN PASO PROFESIONAL</h1>
            <p>
              Acceso exclusivo a roles directivos en las empresas líderes del
              mundo, donde tu talento es verdaderamente valorado.
            </p>
            <Link to="/login" className="main-boton">
              EXPLORAR OPORTUNIDADES
            </Link>
          </div>
          <div className="main-imagen">
            <img src={imagenMain} alt="Imagen main" />
          </div>
        </div>
      </main>

      <section className="nosotros" id="nosotros">
        <h1 className="titulo">TU VIAJE CON HEADHUNTING</h1>
        <div className="linea-pasos">
          <div className="paso">
            <div className="circulo azul">
              <i className="fa-solid fa-file-signature"></i>
            </div>
            <h3>
              1. REGISTRO
              <br />
              CONFIDENCIAL
            </h3>
            <p>
              Crea tu perfil y sube
              <br />
              tu CV de forma
              <br />
              segura.
            </p>
          </div>

          <div className="flecha">→</div>
          <div className="paso">
            <div className="circulo celeste">
              <i className="fa-solid fa-comments"></i>
            </div>
            <h3>
              2. EVALUACIÓN
              <br />Y MENTORÍA
            </h3>
            <p>
              Análisis profundo
              <br />
              de trayectoria y
              <br />
              objetivos.
            </p>
          </div>
          <div className="flecha celeste-texto">→</div>
          <div className="paso">
            <div className="circulo azul">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3>
              IDENTIFICACIÓN DE
              <br />
              OPORTUNIDADES
            </h3>
            <p>
              Búsqueda de roles
              <br />
              alineados con tu
              <br />
              potencial.
            </p>
          </div>

          <div className="flecha">→</div>
          <div className="paso">
            <div className="circulo celeste">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <h3>
              4. PREPARACIÓN
              <br />
              PARA ENTREVISTAS
            </h3>
            <p>
              Coaching y
              <br />
              simulaciones para
              <br />
              el éxito.
            </p>
          </div>

          <div className="flecha">→</div>
          <div className="paso">
            <div className="circulo azul">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h3>
              5. SEGUIMIENTO
              <br />Y COLOCACIÓN
            </h3>
            <p>
              Soporte durante y
              <br />
              después de tu
              <br />
              contratación.
            </p>
          </div>
        </div>
      </section>

      <section className="servicios" id="servicios">
        <h2 className="servicios-titulo">SERVICIOS QUE OFRECEMOS</h2>
        <div className="servicios-container">
          <div className="servicios-tarjeta">
            <img src={servicio1} alt="Servicio 1" className="servicios-img" />
            <h3 className="servicios-subtitulo">ASESORÍA DE CARRERA</h3>
            <p className="servicios-texto">
              Mentoría personalizada y refinamiento de perfil para alcanzar el
              siguiente nivel.
            </p>
          </div>

          <div className="servicios-tarjeta">
            <img src={servicio2} alt="Servicio 2" className="servicios-img" />
            <h3 className="servicios-subtitulo">ACCESO A EMPRESAS LÍDERES</h3>
            <p className="servicios-texto">
              Conexiones con empresas líderes y startups de alto crecimiento
              buscando talento como tú.
            </p>
          </div>

          <div className="servicios-tarjeta">
            <img src={servicio3} alt="Servicio 3" className="servicios-img" />
            <h3 className="servicios-subtitulo">NEGOCIACIÓN DE COMPENSACIÓN</h3>
            <p className="servicios-texto">
              Asistencia experta para asegurar el mejor paquete de
              compensación y beneficios.
            </p>
          </div>
        </div>
      </section>

      <section className="reseñas" id="reseñas">
        <h1>LO QUE DICEN NUESTROS CANDIDATOS EXITOSOS</h1>
        <div className="carrusel">
          <div className="carrusel-track">
            {[0, 1].map((i) => (
              <>
                <div className="tarjeta" key={`sofia-${i}`}>
                  <img src={mujer1} alt="Sofía Andrade" />
                  <div className="contenido">
                    <h2>Sofía Andrade</h2>
                    <h3>Directora de Marketing en Multisa</h3>
                    <p>
                      "HeadHunting no solo me encontró un trabajo; me guiaron
                      hacia el rol ideal."
                    </p>
                  </div>
                </div>

                <div className="tarjeta" key={`alejandro-${i}`}>
                  <img src={hombre} alt="Alejandro Guzman" />
                  <div className="contenido">
                    <h2>Alejandro Guzman</h2>
                    <h3>VP de Finanzas en Corporacion La Favorita</h3>
                    <p>"El proceso fue transparente y profesional."</p>
                  </div>
                </div>

                <div className="tarjeta" key={`maria-${i}`}>
                  <img src={mujer2} alt="María Lema" />
                  <div className="contenido">
                    <h2>María Lema</h2>
                    <h3>Gerente de RRHH</h3>
                    <p>"Excelente atención y acompañamiento."</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section className="contactos-container" id="contactanos">
        <h1>LISTO PARA TU SIGUIENTE GRAN DESAFIO?</h1>
        <form className="contactos-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nombres Completo" required />
          <input type="tel" placeholder="Teléfono" required />
          <input type="email" placeholder="Correo Electronico" required />
          <input
            type="text"
            placeholder="Área de Interés (Ej: Finanzas, Tecnología)"
            required
          />
          <textarea placeholder="Mensaje (Opcional)" rows="4"></textarea>
          <button type="submit" className="contactos-boton">
            <Link to="/login">ENVIAR MI PERFIL CONFIDENCIAL</Link>
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
