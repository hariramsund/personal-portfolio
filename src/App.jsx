import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AIIntro from "./ai/AIIntro";

function App() {
  // 🔥 Loader
  const [loading, setLoading] = useState(true);

  // 🔥 Cursor glow
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Loader effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cursor effect
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🔥 SHOW LOADER FIRST
  if (loading) {
    return (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    );
  }

  // 🔥 MAIN UI
  return (
    <>
      {/* Cursor Glow */}
      <div
        className="cursor-glow"
        style={{ left: position.x, top: position.y }}
      ></div>

      <Navbar />
      <Home />
      <AIIntro />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}

export default App;