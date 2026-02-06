export default function Projects() {
  const projects = [
    {
      image: "/assets/images/projects/student-performance.png",
      link: "https://github.com/J-TECH-bot/Student_performance_Analysis",
    },
    {
      image: "/assets/images/projects/projecthub.png",
      link: "https://github.com/adarsh251010/projecthub",
    },
    {
      image: "/assets/images/projects/ecommerce-api.png",
      link: "https://github.com/adarsh251010/ecommerce-api",
    },
  ];

  return (
    <div className="projects-page">
      <h1 className="projects-title">Projects</h1>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => window.open(project.link, "_blank")}
          >
            <img src={project.image} alt="Project" />
          </div>
        ))}
      </div>
    </div>
  );
}
