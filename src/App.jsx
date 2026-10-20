
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import "./index.css";

const skills = [
  { id: 1, name: "React Development", category: "Web Development", icon: "⚛️", level: "Intermediate", duration: "4 weeks", color: "purple" },
  { id: 2, name: "Java Programming", category: "Programming", icon: "☕", level: "Beginner", duration: "6 weeks", color: "orange" },
  { id: 3, name: "Artificial Intelligence", category: "Emerging Tech", icon: "🤖", level: "Intermediate", duration: "5 weeks", color: "blue" },
  { id: 4, name: "UI/UX Design", category: "Design", icon: "🎨", level: "Beginner", duration: "3 weeks", color: "pink" },
  { id: 5, name: "Python Programming", category: "Programming", icon: "🐍", level: "Beginner", duration: "4 weeks", color: "green" },
  { id: 6, name: "Data Analytics", category: "Data Science", icon: "📊", level: "Intermediate", duration: "5 weeks", color: "yellow" },
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Skill<span>Sphere</span> ✦</Link>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/roadmap">Roadmap</NavLink>
        <NavLink to="/progress">My Progress</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <Link to="/explore" className="nav-cta">Start Learning ↗</Link>
    </nav>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">✦ YOUR FUTURE STARTS HERE</div>
          <h1>Discover skills.<br />Build your <span>future.</span></h1>
          <p>
            Your personal space to explore new skills, create
            learning paths, and turn your ambitions into achievements.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="primary-btn">Explore Skills ↗</Link>
            <Link to="/roadmap" className="secondary-btn">View Roadmap</Link>
          </div>
          <div className="hero-stats">
            <div><strong>06+</strong><small>Skill paths</small></div>
            <div><strong>05</strong><small>Learning pages</small></div>
            <div><strong>∞</strong><small>Possibilities</small></div>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="planet">✦</div>
          <div className="float-card card-one">⚛️ <span>React</span></div>
          <div className="float-card card-two">🤖 <span>AI Skills</span></div>
          <div className="float-card card-three">🚀 <span>Level Up!</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">PICK YOUR DIRECTION</span>
            <h2>Explore popular skills</h2></div>
          <Link to="/explore" className="text-link">View all skills →</Link>
        </div>
        <div className="skill-grid">
          {skills.slice(0, 3).map(skill => <SkillCard key={skill.id} skill={skill} />)}
        </div>
      </section>
    </>
  );
}

function SkillCard({ skill }) {
  return (
    <article className="skill-card">
      <div className={`skill-icon ${skill.color}`}>{skill.icon}</div>
      <span className="category">{skill.category}</span>
      <h3>{skill.name}</h3>
      <p>{skill.level} · {skill.duration}</p>
      <Link to="/roadmap" className="card-link">Explore learning path ↗</Link>
    </article>
  );
}

function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Programming", "Web Development", "Emerging Tech", "Design", "Data Science"];

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || skill.category === category)
  );

  return (
    <section className="page section">
      <span className="eyebrow">THE SKILL LIBRARY</span>
      <h1 className="page-title">Find your next skill.</h1>
      <p className="page-description">Explore technologies and discover what excites you.</p>

      <input
        className="search-box"
        placeholder="🔍 Search Java, AI, React..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="filters">
        {categories.map(item => (
          <button key={item}
            className={category === item ? "filter active-filter" : "filter"}
            onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="skill-grid">
        {filteredSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
      </div>
      {filteredSkills.length === 0 && <p>No skills found. Try another search.</p>}
    </section>
  );
}

function Roadmap() {
  const steps = [
    ["01", "Choose your skill", "Select a topic that matches your career goals.", "🎯"],
    ["02", "Learn the basics", "Understand core concepts and important fundamentals.", "📚"],
    ["03", "Build a mini project", "Apply your knowledge to a practical project.", "🛠️"],
    ["04", "Create your portfolio", "Showcase your project and share your achievements.", "🚀"],
  ];

  return (
    <section className="page section">
      <span className="eyebrow">YOUR JOURNEY</span>
      <h1 className="page-title">From curious to confident.</h1>
      <p className="page-description">A simple roadmap to transform learning into real-world skills.</p>
      <div className="roadmap">
        {steps.map(step => (
          <article className="roadmap-item" key={step[0]}>
            <div className="step-number">{step[0]}</div>
            <div className="step-icon">{step[3]}</div>
            <div><h3>{step[1]}</h3><p>{step[2]}</p></div>
          </article>
        ))}
      </div>
      <Link to="/explore" className="primary-btn">Choose a Skill ↗</Link>
    </section>
  );
}

function Progress() {
  const [completed, setCompleted] = useState([]);

  const toggle = id => setCompleted(old =>
    old.includes(id) ? old.filter(item => item !== id) : [...old, id]
  );

  const percent = Math.round(completed.length / skills.length * 100);

  return (
    <section className="page section">
      <span className="eyebrow">YOUR ACHIEVEMENTS</span>
      <h1 className="page-title">Every step counts.</h1>
      <p className="page-description">Mark skills as completed and watch your progress grow.</p>

      <div className="progress-panel">
        <div className="progress-top">
          <div><span className="eyebrow">OVERALL PROGRESS</span>
            <h2>{percent}% completed</h2></div>
          <div className="progress-number">{completed.length}/{skills.length}</div>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
      </div>

      <div className="progress-list">
        {skills.map(skill => (
          <label className="progress-item" key={skill.id}>
            <div className={`skill-icon ${skill.color}`}>{skill.icon}</div>
            <div className="progress-skill"><strong>{skill.name}</strong><small>{skill.duration}</small></div>
            <input type="checkbox" checked={completed.includes(skill.id)}
              onChange={() => toggle(skill.id)} />
            <span>{completed.includes(skill.id) ? "Completed ✓" : "Mark complete"}</span>
          </label>
        ))}
      </div>
      <p className="note">Demo note: progress resets when this page is refreshed.</p>
    </section>
  );
}

function About() {
  return (
    <section className="page section about-page">
      <span className="eyebrow">ABOUT THE PROJECT</span>
      <h1 className="page-title">Learning should feel like an adventure.</h1>
      <p className="page-description">
        SkillSphere is a student-focused learning discovery platform
        designed to make skill development simple, organized, and engaging.
      </p>
      <div className="about-grid">
        <article><div className="about-icon">🧭</div><h3>Discover</h3><p>Explore technical skills across different domains.</p></article>
        <article><div className="about-icon">🗺️</div><h3>Plan</h3><p>Follow a clear roadmap from fundamentals to projects.</p></article>
        <article><div className="about-icon">🏆</div><h3>Achieve</h3><p>Track completed skills and celebrate progress.</p></article>
      </div>
      <Link to="/explore" className="primary-btn">Begin Exploring ↗</Link>
    </section>
  );
}

function NotFound() {
  return <section className="page section"><h1>Page not found</h1><Link to="/">Return Home</Link></section>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>SkillSphere ✦ <span>Learn something new. Become someone new.</span></footer>
    </BrowserRouter>
  );
}

export default App;
