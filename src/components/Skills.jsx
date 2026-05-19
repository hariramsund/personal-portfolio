function Skills() {
  const skills = [
    { name: "Java", level: 80 },
    { name: "SQL", level: 75 },
    { name: "Excel", level: 75 },
    { name: "Python", level: 85 },
    { name: "Machine Learning", level: 70 },
  ];

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <p>{skill.name}</p>

            <div className="skill-bar">
              <div
                className="skill-fill"
                style={{ width: skill.level + "%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;