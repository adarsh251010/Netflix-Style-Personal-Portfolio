import { useNavigate } from "react-router-dom";
import skills from "../data/Skills";

export default function SkillsPreview() {
  const navigate = useNavigate();

  return (
    <section className="skills-section">
      <h2 className="section-title-xl title-texture">My Skills</h2>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            style={{ backgroundImage: `url(${skill.image})` }}
            onClick={() => navigate(`/skills/${skill.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
