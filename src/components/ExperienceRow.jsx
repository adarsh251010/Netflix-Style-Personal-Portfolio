import { useNavigate } from "react-router-dom";

export default function ExperienceRow() {
  const navigate = useNavigate();

  return (
    <div className="row">
      <h2 className="section-title-xl title-texture">Experience</h2>

      <div className="row-cards">
        <div
          className="experience-preview-card"
          onClick={() => navigate("/experience")}
        >
          <img
            src="/assets/images/experience-backend.png"
            alt="Experience Preview"
          />
          <div className="project-overlay">
            <div className="project-meta">Backend • Support</div>
            <h2>Experience</h2>
            <span className="project-cta">View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
