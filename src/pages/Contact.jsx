import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [revealed, setRevealed] = useState({});
  const showThanks = Boolean(location.state && location.state.autoplay);
  const [showTourModal, setShowTourModal] = useState(showThanks);

  const items = useMemo(
    () => [
      {
        id: "phone",
        label: "Phone",
        value: "+91 7879234475",
        hint: "Direct line",
      },
      {
        id: "email",
        label: "Gmail",
        value: "adarshrai251010@gmail.com",
        hint: "Primary inbox",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "View Profile",
        href:
          "https://www.linkedin.com/in/adarsh-rai-151407383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        hint: "Professional profile",
      },
    ],
    []
  );

  const toggle = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-overlay">
          <div
            className="netflix-back"
            onClick={() =>
              showThanks ? navigate("/", { replace: true }) : navigate(-1)
            }
          >
            <span className="back-icon">&lsaquo;</span>
            <span className="back-text">Back</span>
          </div>

          <div className="contact-hero-content">
            <h1 className="contact-title">Contact</h1>
            <p className="contact-subtitle">
              A clean, privacy-first view of direct channels and professional
              links.
            </p>
            {showThanks ? (
              <p className="contact-thanks">
                Thank you so much for reviewing the portfolio.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-avatar">
            <div className="avatar-ring" />
            <div className="avatar-body" />
            <div className="avatar-caption">
              Identity Vault
              <span>Click cards to reveal</span>
            </div>
          </div>

          <div className="contact-cards">
            {items.map((item) => (
              <div key={item.id} className="contact-card">
                <div className="contact-card-header">
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-hint">{item.hint}</div>
                </div>

                <div className="contact-value">
                  {revealed[item.id] ? (
                    item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )
                  ) : (
                    <span className="masked">************</span>
                  )}
                </div>

                <button
                  className="secondary-btn"
                  onClick={() => toggle(item.id)}
                >
                  {revealed[item.id] ? "Hide" : "Reveal"}
                </button>
                <div
                  className={`contact-reveal-note ${
                    revealed[item.id] ? "show" : ""
                  }`}
                >
                  Let's connect for a professional conversation.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTourModal ? (
        <div className="tour-overlay" onClick={() => setShowTourModal(false)}>
          <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tour-title">Tour Complete</div>
            <p className="tour-message">
              You’ve completed the portfolio tour. Thank you for your time and
              review. If it aligns with your needs, I’d welcome a professional
              conversation.
            </p>
            <button
              className="primary-btn"
              onClick={() => setShowTourModal(false)}
            >
              Continue
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/", { replace: true })}
            >
              Back To Home
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
