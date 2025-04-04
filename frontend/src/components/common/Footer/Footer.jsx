import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithubSquare } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <span className="my-footer">
          RestHotel | &copy; Matias Carrera 2025
        </span>
      </div>
      <div className="links">
              <a
        href="https://www.linkedin.com/in/matias-carrera-761b45328"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoLogoLinkedin size={32} />
      </a>
      <a
        href="https://github.com/maticarrera12"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubSquare size={32} />
      </a>
      </div>

    </footer>
  );
};

export default Footer;
