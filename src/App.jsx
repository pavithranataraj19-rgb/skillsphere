
import { useMemo, useState } from 'react'
import {
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom'

const skills = [
  {
    id: 1,
    title: 'Web Development',
    category: 'Development',
    icon: '🌐',
    level: 'Beginner',
    duration: '6 weeks',
    description: 'Build responsive websites using HTML, CSS, JavaScript and React.',
    color: 'purple',
    lessons: ['HTML and semantic structure', 'CSS and responsive layouts', 'JavaScript fundamentals', 'React components and hooks', 'Build and deploy a portfolio'],
  },
  {
    id: 2,
    title: 'Java Programming',
    category: 'Programming',
    icon: '☕',
    level: 'Beginner',
    duration: '8 weeks',
    description: 'Learn Java fundamentals, object-oriented programming and problem solving.',
    color: 'orange',
    lessons: ['Variables and data types', 'Conditions and loops', 'Methods and arrays', 'Object-oriented programming', 'Collections and coding practice'],
  },
  {
    id: 3,
    title: 'Data Analytics',
    category: 'Data',
    icon: '📊',
    level: 'Intermediate',
    duration: '7 weeks',
    description: 'Turn data into insights with Python, SQL, and visualization.',
    color: 'blue',
    lessons: ['Python fundamentals', 'Pandas and NumPy', 'SQL queries', 'Data visualization', 'Build an analysis project'],
  },
  {
    id: 4,
    title: 'UI/UX Design',
    category: 'Design',
    icon: '🎨',
    level: 'Beginner',
    duration: '4 weeks',
    description: 'Design intuitive interfaces and create user-friendly experiences.',
    color: 'pink',
    lessons: ['Design principles', 'User research', 'Wireframes', 'Prototypes in Figma', 'Usability testing'],
  },
  {
    id: 5,
    title: 'Python Programming',
    category: 'Programming',
    icon: '🐍',
    level: 'Beginner',
    duration: '6 weeks',
    description: 'Learn Python syntax, automation, functions, and practical projects.',
    color: 'green',
    lessons: ['Python syntax', 'Conditions and loops', 'Functions and modules', 'Files and exceptions', 'Build a mini project'],
  },
  {
    id: 6,
    title: 'Machine Learning',
    category: 'Data',
    icon: '🤖',
    level: 'Advanced',
    duration: '10 weeks',
    description: 'Explore data preparation, model training and machine learning concepts.',
    color: 'cyan',
    lessons: ['Python for machine learning', 'Prepare datasets', 'Regression', 'Classification', 'Evaluate a model'],
  },
]

const categories = ['All', 'Development', 'Programming', 'Data', 'Design']

function Header() {
  const location = useLocation()
  const links = [
    ['/', 'Home'],
    ['/explore', 'Explore'],
    ['/roadmap', 'Roadmap'],
    ['/progress', 'My Progress'],
    ['/about', 'About'],
  ]

  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-icon">S</span>
        <span>Skill<span className="brand-accent">Sphere</span></span>
      </Link>

      <nav className="nav">
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/explore"
        className={`header-cta ${location.pathname === '/explore' ? 'header-cta-active' : ''}`}
      >
        Start Learning <span>↗</span>
      </Link>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-brand">SkillSphere.</Link>
      <p>Small steps today. Extraordinary skills tomorrow.</p>
      <span>© {new Date().getFullYear()} SkillSphere</span>
    </footer>
  )
}

function SkillCard({ skill, completedCount = 0 }) {
  const completed = completedCount >= skill.lessons.length

  return (
    <article className="skill-card">
      <div className={`skill-icon ${skill.color}`}>{skill.icon}</div>
      <div className="card-meta">
        <span className="category-label">{skill.category}</span>
        <span className="duration">{skill.duration}</span>
      </div>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <div className="skill-bottom">
        <span className="level-label">{skill.level}</span>
        <Link className="card-link" to={`/roadmap?skill=${skill.id}`}>
          {completed ? 'Review roadmap' : 'View roadmap'} <span>→</span>
        </Link>
      </div>
    </article>
  )
}

function Home({ completedLessons }) {
  const totalLessons = skills.reduce((sum, skill) => sum + skill.lessons.length, 0)
  const completedCount = Object.values(completedLessons).filter(Boolean).length

  return (
    <>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot" /> YOUR PERSONAL LEARNING SPACE</div>
          <h1>
            Discover your potential.
            <br />
            <span>Master your future.</span>
          </h1>
          <p className="hero-description">
            Explore new skills, follow clear learning paths, and turn your
            curiosity into real-world confidence.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="button button-primary">
              Explore skills <span>↗</span>
            </Link>
            <Link to="/roadmap" className="button button-secondary">
              View learning paths
            </Link>
          </div>

          <div className="hero-stats">
            <div><strong>06</strong><span>Skill paths</span></div>
            <div><strong>35+</strong><span>Learning lessons</span></div>
            <div><strong>01</strong><span>Your next step</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Learning dashboard preview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-core"><span>✦</span></div>
          <div className="floating-card floating-top">
            <span className="floating-icon">⚡</span>
            <div><strong>Keep growing</strong><small>One lesson at a time</small></div>
          </div>
          <div className="floating-card floating-bottom">
            <span className="floating-icon">🎯</span>
            <div><strong>{completedCount} lessons completed</strong><small>Keep your momentum going</small></div>
          </div>
          <div className="visual-tag tag-left">LEARN</div>
          <div className="visual-tag tag-right">BUILD</div>
        </div>
      </section>

      <section className="section section-featured">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT CHALLENGE</span>
            <h2>Skills worth <span>exploring.</span></h2>
            <p>Start with what excites you. Grow into what inspires you.</p>
          </div>
          <Link to="/explore" className="text-link">Explore all skills ↗</Link>
        </div>

        <div className="skill-grid">
          {skills.slice(0, 3).map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              completedCount={skill.lessons.filter((_, i) => completedLessons[`${skill.id}-${i}`]).length}
            />
          ))}
        </div>
      </section>

      <section className="journey-banner">
        <div>
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>Progress, not perfection.</h2>
          <p>
            You have completed {completedCount} of {totalLessons} lessons.
            Every small step counts.
          </p>
        </div>
        <div className="banner-actions">
          <Link to="/progress" className="button button-primary">Track my progress →</Link>
        </div>
      </section>
    </>
  )
}

function Explore({ completedLessons }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel] = useState('All')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return skills.filter((skill) => {
      const matchesSearch =
        !normalized ||
        `${skill.title} ${skill.description} ${skill.category}`.toLowerCase().includes(normalized)

      const matchesCategory = category === 'All' || skill.category === category
      const matchesLevel = level === 'All' || skill.level === level

      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [query, category, level])

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">THE SKILL LIBRARY</span>
        <h1>Find your next <span>skill.</span></h1>
        <p>Discover learning paths that match your interests and ambitions.</p>
      </div>

      <div className="explore-toolbar">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills, topics, or interests..."
            aria-label="Search skills"
          />
          {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
        </label>
        <select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter by level">
          <option value="All">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="category-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={`filter-chip ${category === item ? 'selected' : ''}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="results-row">
        <span><strong>{filtered.length}</strong> learning paths found</span>
        <span>Choose one. Start today.</span>
      </div>

      {filtered.length > 0 ? (
        <div className="skill-grid">
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              completedCount={skill.lessons.filter((_, i) => completedLessons[`${skill.id}-${i}`]).length}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🔎</span>
          <h3>No matching skills yet</h3>
          <p>Try another keyword or reset the filters.</p>
          <button className="button button-primary" onClick={() => { setQuery(''); setCategory('All'); setLevel('All') }}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  )
}

function Roadmap({ completedLessons, toggleLesson }) {
  const params = new URLSearchParams(window.location.search)
  const requestedId = Number(params.get('skill'))
  const selectedSkill = skills.find((skill) => skill.id === requestedId) || skills[0]
  const [skillId, setSkillId] = useState(selectedSkill.id)
  const activeSkill = skills.find((skill) => skill.id === skillId) || skills[0]

  const doneCount = activeSkill.lessons.filter((_, i) => completedLessons[`${activeSkill.id}-${i}`]).length
  const percent = Math.round((doneCount / activeSkill.lessons.length) * 100)

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR LEARNING BLUEPRINT</span>
        <h1>A path for <span>every ambition.</span></h1>
        <p>Break big goals into manageable lessons and learn at your own pace.</p>
      </div>

      <div className="roadmap-layout">
        <aside className="roadmap-sidebar">
          <h3>Choose a path</h3>
          {skills.map((skill) => (
            <button
              key={skill.id}
              className={`roadmap-choice ${skillId === skill.id ? 'selected' : ''}`}
              onClick={() => setSkillId(skill.id)}
            >
              <span className={`mini-skill-icon ${skill.color}`}>{skill.icon}</span>
              <span className="choice-text"><strong>{skill.title}</strong><small>{skill.lessons.length} lessons</small></span>
              <span className="choice-arrow">→</span>
            </button>
          ))}
        </aside>

        <div className="roadmap-main">
          <div className="roadmap-intro">
            <div className={`skill-icon ${activeSkill.color}`}>{activeSkill.icon}</div>
            <div>
              <span className="category-label">{activeSkill.category} · {activeSkill.level}</span>
              <h2>{activeSkill.title}</h2>
              <p>{activeSkill.description}</p>
            </div>
          </div>

          <div className="progress-summary">
            <div className="progress-summary-top">
              <span>Your progress</span>
              <strong>{percent}%</strong>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
            <small>{doneCount} of {activeSkill.lessons.length} lessons completed</small>
          </div>

          <div className="lesson-list">
            {activeSkill.lessons.map((lesson, index) => {
              const key = `${activeSkill.id}-${index}`
              const done = Boolean(completedLessons[key])

              return (
                <label key={key} className={`lesson-item ${done ? 'lesson-done' : ''}`}>
                  <span className="lesson-number">{done ? '✓' : String(index + 1).padStart(2, '0')}</span>
                  <span className="lesson-copy"><strong>{lesson}</strong><small>{index === 0 ? 'Start here' : `Step ${index + 1} of ${activeSkill.lessons.length}`}</small></span>
                  <input type="checkbox" checked={done} onChange={() => toggleLesson(key)} />
                </label>
              )
            })}
          </div>

          <p className="roadmap-note">Tip: Mark a lesson complete when you finish practising it. Your progress updates automatically.</p>
        </div>
      </div>
    </section>
  )
}

function Progress({ completedLessons }) {
  const total = skills.reduce((sum, skill) => sum + skill.lessons.length, 0)
  const completed = Object.values(completedLessons).filter(Boolean).length
  const percentage = Math.round((completed / total) * 100)

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR PERSONAL DASHBOARD</span>
        <h1>Look how far <span>you've come.</span></h1>
        <p>Every completed lesson is a step towards your future.</p>
      </div>

      <div className="progress-overview">
        <div className="overview-card overview-highlight">
          <span className="overview-icon">✦</span>
          <span className="overview-label">Overall completion</span>
          <strong>{percentage}%</strong>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
          <small>{completed} of {total} lessons complete</small>
        </div>
        <div className="overview-card">
          <span className="overview-icon">📚</span>
          <span className="overview-label">Learning paths</span>
          <strong>{skills.length}</strong>
          <small>Available to explore</small>
        </div>
        <div className="overview-card">
          <span className="overview-icon">🏁</span>
          <span className="overview-label">Completed paths</span>
          <strong>{skills.filter((skill) => skill.lessons.every((_, i) => completedLessons[`${skill.id}-${i}`])).length}</strong>
          <small>Keep moving forward</small>
        </div>
      </div>

      <div className="section-heading progress-heading">
        <div><span className="eyebrow">KEEP GOING</span><h2>Your learning paths</h2></div>
        <Link to="/roadmap" className="text-link">Open roadmaps ↗</Link>
      </div>

      <div className="progress-path-list">
        {skills.map((skill) => {
          const done = skill.lessons.filter((_, i) => completedLessons[`${skill.id}-${i}`]).length
          const percent = Math.round((done / skill.lessons.length) * 100)

          return (
            <div className="progress-path" key={skill.id}>
              <span className={`mini-skill-icon ${skill.color}`}>{skill.icon}</span>
              <div className="path-details">
                <strong>{skill.title}</strong>
                <small>{done} of {skill.lessons.length} lessons completed</small>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
              </div>
              <strong className="path-percent">{percent}%</strong>
              <Link to={`/roadmap?skill=${skill.id}`} className="path-open" aria-label={`Open ${skill.title} roadmap`}>→</Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">WHY SKILLSPHERE?</span>
        <h1>Learn with purpose.<br /><span>Grow with confidence.</span></h1>
        <p>SkillSphere makes learning feel clear, achievable, and personal.</p>
      </div>

      <div className="about-grid">
        <article className="about-card"><span>01</span><div className="about-emoji">🧭</div><h3>Clear direction</h3><p>Follow structured learning paths instead of wondering what to learn next.</p></article>
        <article className="about-card"><span>02</span><div className="about-emoji">🪴</div><h3>Learn at your pace</h3><p>Make progress in small steps and return whenever you're ready.</p></article>
        <article className="about-card"><span>03</span><div className="about-emoji">✨</div><h3>See your growth</h3><p>Track completed lessons and celebrate every milestone along the way.</p></article>
      </div>

      <div className="about-note">
        <span className="eyebrow">BUILT FOR CURIOUS MINDS</span>
        <h2>Your next chapter begins with one lesson.</h2>
        <Link to="/explore" className="button button-primary">Find your first skill →</Link>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="empty-state not-found">
      <span>🪐</span>
      <h1>Lost in the learning universe?</h1>
      <p>This page doesn't exist, but your next learning step is waiting.</p>
      <Link to="/" className="button button-primary">Back to home</Link>
    </section>
  )
}

export default function App() {
  const [completedLessons, setCompletedLessons] = useState({})

  function toggleLesson(key) {
    setCompletedLessons((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home completedLessons={completedLessons} />} />
          <Route path="/explore" element={<Explore completedLessons={completedLessons} />} />
          <Route path="/roadmap" element={<Roadmap completedLessons={completedLessons} toggleLesson={toggleLesson} />} />
          <Route path="/progress" element={<Progress completedLessons={completedLessons} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
