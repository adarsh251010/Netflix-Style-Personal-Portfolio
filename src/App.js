import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import SkillsDetail from "./pages/SkillsDetail";
import GameDetail from "./pages/GameDetail";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      window.scrollTo(0, 0);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function RouteTransition() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.state && location.state.autoplayTour) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 450);
      return () => clearTimeout(timer);
    }
    setVisible(false);
    return undefined;
  }, [location]);

  return visible ? <div className="route-transition" /> : null;
}

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <RouteTransition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills/:id" element={<SkillsDetail />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
