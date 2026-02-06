import { useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import skills from "../data/Skills";
//import "./SkillsDetail.css";

export default function SkillsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const timersRef = useRef([]);

  const smoothScrollToBottom = (durationMs) => {
    const startY = window.scrollY;
    const targetY = document.body.scrollHeight - window.innerHeight;
    const distance = targetY - startY;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;

    const skillIndex = skills.findIndex((s) => s.id === id);
    const nextSkill = skillIndex >= 0 ? skills[skillIndex + 1] : null;

    window.scrollTo(0, 0);

    const scrollTimer = setTimeout(() => {
      smoothScrollToBottom(4000);
    }, 500);
    timersRef.current.push(scrollTimer);

    const nextTimer = setTimeout(() => {
      if (nextSkill) {
        navigate(`/skills/${nextSkill.id}`, {
          state: { autoplayTour: true },
          replace: true,
        });
        return;
      }
      navigate("/games/tic-tac-toe-ai", {
        state: { autoplayTour: true },
        replace: true,
      });
    }, 4500);
    timersRef.current.push(nextTimer);

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [id, location.state, navigate]);

  useEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;

    const stopTour = () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      navigate(`/skills/${id}`, { replace: true });
    };

    const handler = () => stopTour();

    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", handler, { passive: true });
    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handler);
    };
  }, [id, location.state, navigate]);

  const skill = skills.find((s) => s.id === id);

  if (!skill) return null;

  return (
    <div className="skill-detail-page">
      {/* HERO */}
      <div
        className="skill-hero"
        style={{ backgroundImage: `url(${skill.image})` }}
      >
        <div className="skill-hero-overlay">
          {/* Netflix-style Back Button */}
      <div
        className="netflix-back"
        onClick={() => navigate("/")}
      >
        <span className="back-icon">‹</span>
        <span className="back-text">Back</span>
      </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="skill-content">
        <h1 className="skill-title">{skill.title}</h1>

        <p className="skill-description">
          {skill.description}
        </p>

        <div className="skill-tags">
          {skill.items.map((item, index) => (
            <span key={index} className="skill-tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
