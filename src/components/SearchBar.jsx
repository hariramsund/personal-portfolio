import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Portfolio data to search through
  const portfolioData = {
    projects: [
      {
        id: "proj1",
        title: "AI Traffic Prediction System",
        description:
          "AI-powered traffic prediction using machine learning for smart cities",
        tech: "Python, Pandas, NumPy, ML",
        section: "Projects",
        link: "#projects",
      },
    ],
    skills: [
      { id: "skill1", name: "Java", section: "Skills", link: "#skills" },
      { id: "skill2", name: "Python", section: "Skills", link: "#skills" },
      { id: "skill3", name: "SQL", section: "Skills", link: "#skills" },
      {
        id: "skill4",
        name: "Machine Learning",
        section: "Skills",
        link: "#skills",
      },
      { id: "skill5", name: "Excel", section: "Skills", link: "#skills" },
    ],
    sections: [
      { id: "home", name: "Home", section: "Navigation", link: "#" },
      { id: "about", name: "About", section: "Navigation", link: "#about" },
      { id: "skills", name: "Skills", section: "Navigation", link: "#skills" },
      {
        id: "projects",
        name: "Projects",
        section: "Navigation",
        link: "#projects",
      },
      {
        id: "education",
        name: "Education",
        section: "Navigation",
        link: "#education",
      },
      {
        id: "contact",
        name: "Contact",
        section: "Navigation",
        link: "#contact",
      },
    ],
  };

  // Search function
  const handleSearch = (value) => {
    setQuery(value);

    if (value.length === 0) {
      setResults([]);
      return;
    }

    const searchTerm = value.toLowerCase();
    const foundResults = [];

    // Search projects
    portfolioData.projects.forEach((project) => {
      if (
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tech.toLowerCase().includes(searchTerm)
      ) {
        foundResults.push(project);
      }
    });

    // Search skills
    portfolioData.skills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(searchTerm)) {
        foundResults.push(skill);
      }
    });

    // Search sections
    portfolioData.sections.forEach((section) => {
      if (section.name.toLowerCase().includes(searchTerm)) {
        foundResults.push(section);
      }
    });

    setResults(foundResults.slice(0, 8)); // Limit to 8 results
  };

  // Navigate to result
  const handleResultClick = (link) => {
    window.location.hash = link;
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const container = document.querySelector(`.${styles.searchContainer}`);
      if (container && !container.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search portfolio... (Ctrl+K)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={styles.searchInput}
        />
        {query && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className={styles.resultsContainer}>
          {results.length > 0 ? (
            <div className={styles.resultsList}>
              {results.map((result) => (
                <button
                  key={result.id}
                  className={styles.resultItem}
                  onClick={() => handleResultClick(result.link)}
                >
                  <div className={styles.resultContent}>
                    <h4>{result.title || result.name}</h4>
                    <p>{result.description || result.section}</p>
                  </div>
                  <span className={styles.badge}>{result.section}</span>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className={styles.noResults}>
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>Start typing to search...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
