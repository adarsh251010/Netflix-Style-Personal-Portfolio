import { useNavigate } from "react-router-dom";

export default function ProjectsPreview() {
  const navigate = useNavigate();

  return (
    <div className="projects-preview">
      <h2 className="section-title-xl title-texture">Projects</h2>

      <div
        className="projects-preview-card"
        onClick={() => navigate("/projects")}
      >
        <img
          src="/assets/images/projects/projects-preview.png"
          alt="Projects Preview"
        />
      </div>
    </div>
  );
}
