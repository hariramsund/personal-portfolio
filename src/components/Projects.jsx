function Projects() {
  return (
    <section id="projects" className="section">
      <h2>🚀 Featured Project</h2>

      <div className="project-card">

        <img
          src="https://source.unsplash.com/600x300/?traffic,ai,city"
          alt="AI Traffic Prediction"
        />

        <div className="project-content">
          <h3>AI Traffic Prediction System</h3>

          <p>
            AI-powered traffic prediction system using machine learning 
            to optimize urban traffic flow and improve smart city planning.
          </p>

          <p className="tech">
            <strong>Tech:</strong> Python, Pandas, NumPy, Machine Learning
          </p>

          <div className="project-buttons">

            <a
              href="https://github.com/hariramsund/AI_Traffic_Prediction"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 GitHub
            </a>

            <a
              href="https://github.com/hariramsund/AI_Traffic_Prediction"
              target="_blank"
              rel="noopener noreferrer"
            >
              📂 View Code
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Projects;