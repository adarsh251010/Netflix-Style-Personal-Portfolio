import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Experience() {
  const navigate = useNavigate();
  const location = useLocation();

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

    window.scrollTo(0, 0);

    const scrollTimer = setTimeout(() => {
      smoothScrollToBottom(5000);
    }, 500);

    const nextTimer = setTimeout(() => {
      navigate(location.state.nextPath || "/projects", {
        state: { autoplayTour: true, nextPath: "/skills/languages" },
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
      navigate("/experience", { replace: true });
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
    <div className="experience-page">
      <div className="netflix-back" onClick={() => navigate("/")}>
        <span className="back-icon">&lsaquo;</span>
        <span className="back-text">Back</span>
      </div>

      <div className="experience-hero">
        <div>
          <h1 className="experience-title title-texture">Experience</h1>
          <p className="experience-subtitle">
            Backend-focused engineering with production support, quality
            validation, and reliable delivery across enterprise systems.
          </p>
        </div>
        <div className="experience-metrics">
          <div className="metric-card">
            <div className="metric-label">Focus</div>
            <div className="metric-value">Backend Systems</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Strength</div>
            <div className="metric-value">Quality & Validation</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Delivery</div>
            <div className="metric-value">Production Support</div>
          </div>
        </div>
      </div>

      {/* INADEV */}
      <section className="experience-section experience-panel">
        <h1 className="company-name">INADEV</h1>
        <p className="duration">June 2025 – Present</p>

        <h2 className="role">Graduate Trainee – Backend Engineer</h2>

        <p className="client">
          Client: <span>AXIS Max Life Insurance</span>
        </p>
        <p className="experience-impact">
          Impact: Strengthened release confidence through rigorous flow
          validation and production-readiness checks.
        </p>

        <ul className="experience-points">
          <li>
            Worked on validating and analyzing <strong>end-to-end API flows</strong>{" "}
            across backend services to ensure correct request–response behavior.
          </li>
          <li>
            Checked and monitored <strong>application logs</strong> to identify
            issues, debug failures, and support root-cause analysis.
          </li>
          <li>
            Assisted in backend configuration updates including{" "}
            <strong>introducing and validating keys and parameters</strong>{" "}
            required for internal services.
          </li>
          <li>
            Worked on <strong>NFO-related backend tasks</strong>, ensuring
            correct data flow and configuration alignment.
          </li>
          <li>
            Performed <strong>DDB (database) file updates</strong> as per
            operational and business requirements.
          </li>
          <li>
            Created and validated <strong>UTM parameters</strong> to support
            tracking and integration needs.
          </li>
          <li>
            Supported{" "}
            <strong>production and lower-environment deployments</strong> by
            verifying configuration changes and post-deployment behavior.
          </li>
          <li>
            Coordinated with senior developers and QA teams to validate fixes
            and close backend issues following change-management processes.
          </li>
        </ul>

        <div className="tech-stack">
          Java · Spring Boot · REST APIs · SQL · Logs · Enterprise Systems
        </div>
      </section>

      {/* TECH MAHINDRA */}
      <section className="experience-section experience-panel">
        <h1 className="company-name">Tech Mahindra</h1>
        <p className="duration">Sept 2024 – June 2025</p>

        <h2 className="role">Operations Associate (Tech-enabled Role)</h2>

        <p className="client">
          Client: <span>CRED Application</span>
        </p>
        <p className="experience-impact">
          Impact: Improved operational accuracy by automating reporting and
          optimizing SQL-based validations.
        </p>

        <ul className="experience-points">
          <li>
            Automated operational and reporting tasks using{" "}
            <strong>Python and SQL</strong>, reducing manual effort and
            improving accuracy.
          </li>
          <li>
            Created and optimized <strong>SQL queries</strong> involving joins,
            aggregations, and validations.
          </li>
          <li>
            Assisted in <strong>API testing, release validation</strong>, and
            post-deployment checks.
          </li>
          <li>
            Supported data reconciliation and issue resolution by analyzing
            discrepancies and coordinating with technical teams.
          </li>
          <li>
            Worked in a <strong>high-scale consumer application environment</strong>{" "}
            following SLA-driven operational workflows.
          </li>
        </ul>

        <div className="tech-stack">
          Python · SQL · API Testing · Data Validation · Operations
        </div>
      </section>
    </div>
  );
}
