export default function Banner({ onAutoplay }) {
  const openResume = () => {
    window.open("/Adarsh_Rai_Resume.pdf", "_blank");
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.75) 35%,
            rgba(0,0,0,0.4) 60%,
            rgba(0,0,0,0.1) 100%
          ),
          url(/assets/images/banner.png)
        `,
      }}
    >
      <div className="hero-content">
        <div className="hero-title">
          <h1>
            Hi, I&apos;m <span>Adarsh Rai</span>
          </h1>
        </div>

        <p>Software Engineer | Full Stack Developer</p>

        <div className="hero-meta">
          <div className="hero-stack">
            Java • Spring Boot • React • SQL • AWS • Docker • Data Analysis
          </div>
          <div className="hero-learning">
            Currently learning: System Design • AWS Architecture • Performance
            Tuning
          </div>
        </div>

        <div className="hero-actions">
          <button className="primary-btn" onClick={openResume}>
            View Resume
          </button>
          <button
            className="primary-btn ghost-btn"
            onClick={onAutoplay}
          >
            Auto Tour
          </button>
        </div>
      </div>
    </section>
  );
}
