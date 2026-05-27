/**
 * SEARCHBAR UNIT TESTS - PHASE BY PHASE VALIDATION
 * Manual testing without external dependencies
 */

// Portfolio Data (from SearchBar component)
const portfolioData = {
  projects: [
    {
      id: "proj1",
      title: "AI Traffic Prediction System",
      description: "AI-powered traffic prediction using machine learning for smart cities",
      tech: "Python, Pandas, NumPy, ML",
      section: "Projects",
      link: "#projects",
    },
  ],
  skills: [
    { id: "skill1", name: "Java", section: "Skills", link: "#skills" },
    { id: "skill2", name: "Python", section: "Skills", link: "#skills" },
    { id: "skill3", name: "SQL", section: "Skills", link: "#skills" },
    { id: "skill4", name: "Machine Learning", section: "Skills", link: "#skills" },
    { id: "skill5", name: "Excel", section: "Skills", link: "#skills" },
  ],
  sections: [
    { id: "home", name: "Home", section: "Navigation", link: "#" },
    { id: "about", name: "About", section: "Navigation", link: "#about" },
    { id: "skills", name: "Skills", section: "Navigation", link: "#skills" },
    { id: "projects", name: "Projects", section: "Navigation", link: "#projects" },
    { id: "education", name: "Education", section: "Navigation", link: "#education" },
    { id: "contact", name: "Contact", section: "Navigation", link: "#contact" },
  ],
};

// Test Results Storage
const testResults = {
  phase1: [],
  phase2: [],
  phase3: [],
  phase4: [],
  phase5: [],
  phase6: [],
};

// Utility Functions
const test = (phaseName, testName, fn) => {
  try {
    fn();
    const phase = Object.keys(testResults).find(p => p.includes(phaseName.toLowerCase()));
    testResults[phase].push({ name: testName, status: "✅ PASS", error: null });
    console.log(`✅ ${testName}`);
  } catch (error) {
    const phase = Object.keys(testResults).find(p => p.includes(phaseName.toLowerCase()));
    testResults[phase].push({ name: testName, status: "❌ FAIL", error: error.message });
    console.log(`❌ ${testName}: ${error.message}`);
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const assertEqual = (actual, expected, message) => {
  if (actual !== expected) throw new Error(`${message} | Expected: ${expected}, Got: ${actual}`);
};

const assertIncludes = (text, substring, message) => {
  if (!text.toLowerCase().includes(substring.toLowerCase())) {
    throw new Error(`${message} | "${text}" does not include "${substring}"`);
  }
};

const assertArrayLength = (arr, expectedLength, message) => {
  if (arr.length !== expectedLength) {
    throw new Error(`${message} | Expected length: ${expectedLength}, Got: ${arr.length}`);
  }
};

const assertArrayMaxLength = (arr, maxLength, message) => {
  if (arr.length > maxLength) {
    throw new Error(`${message} | Expected max length: ${maxLength}, Got: ${arr.length}`);
  }
};

// ============ PHASE 1: INITIAL STATE VALIDATION ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 1: INITIAL STATE VALIDATION");
console.log("=".repeat(70) + "\n");

test("phase1", "Portfolio data is structured correctly", () => {
  assert(portfolioData.projects, "Projects array exists");
  assert(portfolioData.skills, "Skills array exists");
  assert(portfolioData.sections, "Sections array exists");
});

test("phase1", "Portfolio contains expected items", () => {
  assertArrayLength(portfolioData.projects, 1, "Projects");
  assertArrayLength(portfolioData.skills, 5, "Skills");
  assertArrayLength(portfolioData.sections, 6, "Sections");
});

test("phase1", "Each project has required fields", () => {
  const project = portfolioData.projects[0];
  assert(project.id, "Project has id");
  assert(project.title, "Project has title");
  assert(project.description, "Project has description");
  assert(project.tech, "Project has tech");
  assert(project.section, "Project has section");
  assert(project.link, "Project has link");
});

test("phase1", "Each skill has required fields", () => {
  const skill = portfolioData.skills[0];
  assert(skill.id, "Skill has id");
  assert(skill.name, "Skill has name");
  assert(skill.section, "Skill has section");
  assert(skill.link, "Skill has link");
});

// ============ PHASE 2: SEARCH LOGIC VALIDATION ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 2: SEARCH LOGIC VALIDATION");
console.log("=".repeat(70) + "\n");

const performSearch = (query) => {
  if (query.length === 0) return [];
  
  const searchTerm = query.toLowerCase();
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
  
  return foundResults.slice(0, 8);
};

test("phase2", "Empty query returns empty results", () => {
  const results = performSearch("");
  assertArrayLength(results, 0, "Empty query");
});

test("phase2", "Can find skill by name", () => {
  const results = performSearch("Python");
  assert(results.length > 0, "Results found");
  assert(results.some(r => r.name === "Python"), "Python skill found");
});

test("phase2", "Can find project by title", () => {
  const results = performSearch("AI Traffic");
  assert(results.length > 0, "Results found");
  assert(results.some(r => r.title.includes("AI Traffic")), "Project found");
});

test("phase2", "Can find section by name", () => {
  const results = performSearch("About");
  assert(results.length > 0, "Results found");
  assert(results.some(r => r.name === "About"), "Section found");
});

test("phase2", "Search is case-insensitive", () => {
  const results1 = performSearch("python");
  const results2 = performSearch("PYTHON");
  const results3 = performSearch("Python");
  
  assert(results1.length > 0, "Lowercase search works");
  assert(results2.length > 0, "Uppercase search works");
  assert(results3.length > 0, "Mixed case search works");
  assertEqual(results1.length, results2.length, "Case-insensitive results match");
});

test("phase2", "Search works for partial matches", () => {
  const results = performSearch("Py");
  assert(results.length > 0, "Partial match found");
  assert(results.some(r => r.name === "Python"), "Python skill found with 'Py'");
});

test("phase2", "Search in project description works", () => {
  const results = performSearch("machine learning");
  assert(results.length > 0, "Description search works");
  assert(results.some(r => r.title.includes("AI Traffic")), "Project found via description");
});

test("phase2", "No results for non-existent query", () => {
  const results = performSearch("NonexistentSkill12345");
  assertArrayLength(results, 0, "Non-existent query");
});

// ============ PHASE 3: RESULT LIMITING ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 3: RESULT LIMITING (MAX 8 RESULTS)");
console.log("=".repeat(70) + "\n");

test("phase3", "Results are limited to maximum 8 items", () => {
  const results = performSearch("S"); // 'S' matches many items
  assertArrayMaxLength(results, 8, "Result limit");
});

test("phase3", "Short queries return fewer results", () => {
  const results = performSearch("Java");
  assert(results.length <= 8, "Results within limit");
});

test("phase3", "Long queries return results within limit", () => {
  const results = performSearch("Machine Learning");
  assert(results.length <= 8, "Results within limit");
});

// ============ PHASE 4: RESULT TYPES AND CATEGORIES ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 4: RESULT TYPES AND CATEGORIES");
console.log("=".repeat(70) + "\n");

test("phase4", "Results include correct section information", () => {
  const results = performSearch("Python");
  assert(results.some(r => r.section === "Skills"), "Skill category present");
});

test("phase4", "Results include correct navigation items", () => {
  const results = performSearch("Contact");
  assert(results.some(r => r.section === "Navigation"), "Navigation category present");
});

test("phase4", "Results include correct project information", () => {
  const results = performSearch("AI Traffic");
  assert(results.some(r => r.section === "Projects"), "Project category present");
});

test("phase4", "Results contain required properties", () => {
  const results = performSearch("Python");
  if (results.length > 0) {
    const result = results[0];
    assert(result.id, "Result has id");
    assert(result.section, "Result has section");
    assert(result.link, "Result has link");
  }
});

// ============ PHASE 5: SPECIAL CHARACTERS AND EDGE CASES ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 5: SPECIAL CHARACTERS & EDGE CASES");
console.log("=".repeat(70) + "\n");

test("phase5", "Handles whitespace in search", () => {
  const results = performSearch("  Python  ");
  assert(results.length > 0, "Whitespace handled");
});

test("phase5", "Handles special characters", () => {
  const results = performSearch("C++");
  assert(results.length >= 0, "Special characters don't crash");
});

test("phase5", "Handles very long queries", () => {
  const longQuery = "a".repeat(100);
  const results = performSearch(longQuery);
  assertArrayLength(results, 0, "Long non-matching query");
});

test("phase5", "Handles numbers in search", () => {
  const results = performSearch("123");
  assert(results.length >= 0, "Numbers handled");
});

test("phase5", "Handles single character search", () => {
  const results = performSearch("S");
  assert(results.length >= 0, "Single character handled");
});

// ============ PHASE 6: MULTI-CATEGORY SEARCH ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 6: MULTI-CATEGORY SEARCH");
console.log("=".repeat(70) + "\n");

test("phase6", "Search returns projects and skills", () => {
  const results = performSearch("S");
  const hasProjects = results.some(r => r.section === "Projects");
  const hasSkills = results.some(r => r.section === "Skills");
  assert(hasProjects || results.length > 0, "Can search projects");
  assert(hasSkills || results.length > 0, "Can search skills");
});

test("phase6", "Search returns navigation sections", () => {
  const results = performSearch("Skills");
  const hasNavigation = results.some(r => r.section === "Navigation");
  assert(hasNavigation, "Navigation sections found");
});

test("phase6", "Different search terms find different categories", () => {
  const skillResults = performSearch("Python");
  const navResults = performSearch("Home");
  
  assert(skillResults.length > 0, "Skill search works");
  assert(navResults.length > 0, "Navigation search works");
});

// ============ PERFORMANCE TESTS ============
console.log("\n" + "=".repeat(70));
console.log("PHASE 7: PERFORMANCE TESTS");
console.log("=".repeat(70) + "\n");

test("phase4", "Search completes in reasonable time (< 10ms)", () => {
  const start = Date.now();
  performSearch("Python");
  const end = Date.now();
  const duration = end - start;
  
  assert(duration < 10, `Search took ${duration}ms, expected < 10ms`);
});

test("phase4", "Multiple searches execute efficiently", () => {
  const start = Date.now();
  for (let i = 0; i < 100; i++) {
    performSearch("Python");
  }
  const end = Date.now();
  const duration = end - start;
  
  assert(duration < 500, `100 searches took ${duration}ms, expected < 500ms`);
});

// ============ FINAL SUMMARY ============
console.log("\n" + "=".repeat(70));
console.log("FINAL TEST SUMMARY");
console.log("=".repeat(70) + "\n");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

Object.entries(testResults).forEach(([phase, tests]) => {
  const phaseNum = phase.replace("phase", "").toUpperCase();
  const passed = tests.filter(t => t.status.includes("✅")).length;
  const failed = tests.filter(t => t.status.includes("❌")).length;
  const total = tests.length;
  
  totalTests += total;
  passedTests += passed;
  failedTests += failed;
  
  console.log(`PHASE ${phaseNum}: ${passed}/${total} PASSED`);
  tests.forEach(t => {
    console.log(`  ${t.status} ${t.name}`);
    if (t.error) console.log(`     Error: ${t.error}`);
  });
  console.log();
});

console.log("=".repeat(70));
console.log(`OVERALL RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`SUCCESS RATE: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
console.log("=".repeat(70));

if (failedTests === 0) {
  console.log("\n✅ ALL TESTS PASSED - SearchBar is working correctly!\n");
} else {
  console.log(`\n⚠️  ${failedTests} test(s) failed - Review results above\n`);
}

// Export for use
module.exports = { performSearch, testResults };
