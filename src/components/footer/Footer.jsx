import facebook from "../../assets/imgs/facebook.png";
import instagram from "../../assets/imgs/instagram.png";
import twitter from "../../assets/imgs/twitter.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span>
          <strong>HeadHunting</strong>
        </span>
      </div>
      <p className="pie-texto">Reclutamiento de Talento Humano · ESFOT – EPN · 2026</p>
      <div className="footer-contactos">
        <a href="http://facebook.com" target="_blank" rel="noreferrer">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="http://instagram.com" target="_blank" rel="noreferrer">
          <img src={instagram} alt="Instagram" />
        </a>
        <a href="http://x.com" target="_blank" rel="noreferrer">
          <img src={twitter} alt="X" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
