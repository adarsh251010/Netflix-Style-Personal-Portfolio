import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionNav = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button
          type="button"
          className="nav-item nav-btn"
          onClick={() => handleSectionNav("experience")}
        >
          EXPERIENCE
        </button>
        <button
          type="button"
          className="nav-item nav-btn"
          onClick={() => handleSectionNav("projects")}
        >
          PROJECTS
        </button>
        <button
          type="button"
          className="nav-item nav-btn"
          onClick={() => handleSectionNav("skills")}
        >
          SKILLS
        </button>
        <Link to="/contact" className="nav-item">CONTACT</Link>

        <a
          href="https://github.com/adarsh251010"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          GITHUB
        </a>
      </div>
    </nav>
  );
}
