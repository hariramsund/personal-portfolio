function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact Me</h2>

      <div className="contact-container">

        <a href="mailto:hariramsund@gmail.com" className="contact-card">
          📧 Email <br /> hariramsund@gmail.com
        </a>

        <a href="tel:+916382947955" className="contact-card">
          📞 Phone <br /> +91 6382947955
        </a>

        <div className="contact-card">
          📍 Location <br /> Tamil Nadu, India
        </div>

        <a
          href="https://www.linkedin.com/in/hari-ram-5703801b4"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          🔗 LinkedIn
        </a>

        <a
          href="https://github.com/hariramsund"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          💻 GitHub
        </a>

      </div>
    </section>
  );
}

export default Contact;