import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner";
import ExperienceRow from "../components/ExperienceRow";
import ProjectsPreview from "../components/ProjectsPreview";
import SkillsPreview from "../components/SkillsPreview";
import Row from "../components/Row";

import { games } from "../data/Games";


export default function Home() {
  const navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const timersRef = useRef([]);
  const introTimerRef = useRef(null);

  const smoothScrollTo = (targetY, durationMs) => {
    const startY = window.scrollY;
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
    if (!autoPlay) return;

    const steps = [
      { type: "scroll", id: "experience", delay: 3500 },
      { type: "scroll", id: "projects", delay: 3500 },
      { type: "scroll", id: "skills", delay: 3500 },
      { type: "scroll", id: "games", delay: 3500 },
      {
        type: "route",
        path: "/experience",
        delay: 3500,
        state: { autoplayTour: true, nextPath: "/projects" },
      },
    ];

    let total = 0;
    steps.forEach((step) => {
      total += step.delay;
      const timer = setTimeout(() => {
        if (step.type === "scroll") {
          const el = document.getElementById(step.id);
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY;
            smoothScrollTo(targetY, 2800);
          }
          return;
        }
        navigate(
          step.path,
          step.state ? { state: step.state, replace: true } : { replace: true }
        );
      }, total);
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [autoPlay, navigate]);

  useEffect(() => {
    if (!autoPlay && !introVisible) return;

    const stopTour = () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
        introTimerRef.current = null;
      }
      setAutoPlay(false);
      setIntroVisible(false);
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
  }, [autoPlay, introVisible]);

  const handleAutoplay = () => {
    if (autoPlay || introVisible) return;
    setIntroVisible(true);
    introTimerRef.current = setTimeout(() => {
      setIntroVisible(false);
      setAutoPlay(true);
    }, 2600);
  };

  return (
    <>
      {/* HERO / BANNER */}
      <Banner onAutoplay={handleAutoplay} />
      {introVisible ? (
        <div className="tour-intro">
          <div className="tour-intro-card">
            <div className="tour-intro-title">Auto Tour</div>
            <div className="tour-intro-text">
              Relax and enjoy a guided walkthrough of the portfolio.
            </div>
          </div>
        </div>
      ) : null}

      {/* EXPERIENCE */}
      <section id="experience" className="home-section">
        <ExperienceRow />
      </section>

      {/* PROJECTS (cinematic preview, click → full page) */}
      <section id="projects" className="home-section">
        <ProjectsPreview />
      </section>

      {/* SKILLS (Netflix-style grid: 4 x 2) */}
      <section id="skills" className="home-section">
        <SkillsPreview />
      </section>

      {/* ENGINEERING PLAYGROUND */}
      <section id="games" className="home-section">
        <Row
          title="Engineering Playground"
          description="Interactive modules demonstrating problem-solving, state management, performance optimization, and UX thinking."
          items={games}
        />
      </section>
    </>
  );
}
