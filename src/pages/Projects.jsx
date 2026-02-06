import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  const projects = [
    {
      title: "Student Performance Analysis",
      image: "/assets/images/projects/student-performance.png",
      link: "https://github.com/J-TECH-bot/Student_performance_Analysis",
      focus: "Analytics • Insights",
    },
    {
      title: "ProjectHub",
      image: "/assets/images/projects/projecthub.png",
      link: "https://github.com/adarsh251010/projecthub",
      focus: "Productivity • Collaboration",
    },
    {
      title: "E-commerce API",
      image: "/assets/images/projects/ecommerce-api.png",
      link: "https://github.com/adarsh251010/ecommerce-api",
      focus: "Backend • Integrations",
    },
  ];

  useLayoutEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;
    const root = document.documentElement;
    const body = document.body;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => window.scrollTo(0, 0), 0);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 50);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      root.style.scrollBehavior = prevBehavior;
      body.style.scrollBehavior = "";
    };
  }, [location.state]);

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

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const scrollTimer = setTimeout(() => {
      smoothScrollToBottom(5000);
    }, 500);

    const nextTimer = setTimeout(() => {
      navigate(location.state.nextPath || "/skills/languages", {
        state: { autoplayTour: true, nextPath: "/games/tic-tac-toe-ai" },
        replace: true,
      });
    }, 5500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(nextTimer);
    };
  }, [location.state, navigate]);

  useEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;

    const stopTour = () => {
      navigate("/projects", { replace: true });
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
  }, [location.state, navigate]);

  return (
    <div className="projects-page">
      <div className="netflix-back" onClick={() => navigate("/")}>
        <span className="back-icon">&lsaquo;</span>
        <span className="back-text">Back</span>
      </div>

      <div className="projects-hero">
        <h1 className="projects-title section-title-xl title-texture">
          Projects
        </h1>
        <p className="section-subtitle">
          Selected builds highlighting backend systems, analytics, and product
          delivery with production-minded engineering.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <img src={project.image} alt={project.title} />
            <div className="project-overlay">
              <div className="project-meta">{project.focus}</div>
              <h2>{project.title}</h2>
              <span className="project-cta">View Repo</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
