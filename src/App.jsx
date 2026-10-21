
import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

const skills = [
  {
    id: 'web',
    title: 'Web Development',
    category: 'Development',
    icon: '🌐',
    level: 'Beginner',
    duration: '6 weeks',
    description: 'Build responsive websites with HTML, CSS, JavaScript and React.',
    color: 'blue',
    lessons: [
      'HTML fundamentals',
      'CSS and responsive design',
      'JavaScript essentials',
      'React components and props',
      'Build a portfolio website',
    ],
  },
  {
    id: 'java',
    title: 'Java Programming',
    category: 'Programming',
    icon: '☕',
    level: 'Beginner',
    duration: '5 weeks',
    description: 'Learn Java fundamentals, object-oriented programming and coding.',
    color: 'orange',
    lessons: [
      'Variables and data types',
      'Conditions and loops',
      'Methods and arrays',
      'Object-oriented programming',
      'Build a Java mini project',
    ],
  },
  {
    id: 'python',
    title: 'Python Programming',
    category: 'Programming',
    icon: '🐍',
    level: 'Beginner',
    duration: '4 weeks',
    description: 'Start coding with Python and solve practical problems.',
    color: 'green',
    lessons: [
      'Python syntax and variables',
      'Conditions and loops',
      'Lists, tuples and dictionaries',
      'Functions and modules',
      'Build a Python mini project',
    ],
  },
  {
    id: 'data',
    title: 'Data Analytics',
    category: 'Data',
    icon: '📊',
    level: 'Intermediate',
    duration: '6 weeks',
    description: 'Explore data using Python, spreadsheets and visualizations.',
    color: 'purple',
    lessons: [
      'Data analytics fundamentals',
      'Spreadsheet essentials',
      'Python with Pandas',
      'Data visualization',
      'Create a data dashboard',
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    category: 'Design',
    icon: '🎨',
    level: 'Beginner',
    duration: '3 weeks',
    description: 'Learn user-friendly design, wireframes and interface layouts.',
    color: 'pink',
    lessons: [
      'Design principles',
      'User research basics',
      'Wireframes and layouts',
      'Prototype a mobile app',
      'Create a portfolio case study',
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    category: 'Data',
    icon: '🤖',
    level: 'Intermediate',
    duration: '7 weeks',
    description: 'Understand AI basics and create a simple intelligent application.',
    color: 'cyan',
    lessons: [
      'Introduction to AI',
      'Python for AI',
      'Data preparation',
      'Machine learning basics',
      'Build a simple AI project',
    ],
  },
]

const categories = [
  'All',
  'Development',
  'Programming',
  'Data',
  'Design',
]

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem('skillsphere-progress') || '{}')
  } catch {
    return {}
  }
}

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore Skills' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/progress', label: 'My Progress' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-icon">S</span>
          <span>Skill<span className="brand-highlight">Sphere</span></span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/explore" className="nav-cta">
            Start Learning ↗
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="brand footer-brand">
        <span className="brand-icon">S</span>
        <span>Skill<span className="brand-highlight">Sphere</span></span>
      </Link>
      <p>Learn with purpose. Grow with confidence.</p>
      <p className="copyright">© {new Date().getFullYear()} SkillSphere</p>
    </footer>
  )
}

function SkillCard({ skill, completed = [] }) {
  const progress = Math.round((completed.length / skill.lessons.length) * 100)

  return (
    <article className="skill-card">
      <div className={`skill-icon ${skill.color}`}>{skill.icon}</div>
      <div className="skill-meta">
        <span className="tag">{skill.category}</span>
        <span className="duration">{skill.duration}</span>
      </div>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <div className="skill-details">
        <span>◉ {skill.level}</span>
        <span>{skill.lessons.length} lessons</span>
      </div>
      <div className="mini-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{progress}%</span>
      </div>
      <Link to={`/roadmap?skill=${skill.id}`} className="card-link">
        {progress === 100 ? 'Review course' : 'View learning path'} <span>→</span>
      </Link>
    </article>
  )
}

function Home({ progress }) {
  const featured = skills.slice(0, 3)
  const completedCount = Object.values(progress).reduce(
    (total, lessons) => total + lessons.length,
    0
  )

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><span className="live-dot" /> YOUR PERSONAL LEARNING SPACE</span>
          <h1>Turn your curiosity into <span className="gradient-text">real skills.</span></h1>
          <p className="hero-description">
            Discover what you love, follow a clear learning roadmap, and
            celebrate every step of your progress.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="button button-primary">
              Explore Skills <span>→</span>
            </Link>
            <Link to="/roadmap" className="button button-secondary">
              View Roadmap
            </Link>
          </div>
          <div className="hero-stats">
            <div><strong>06</strong><span>Learning paths</span></div>
            <div><strong>30+</strong><span>Learning steps</span></div>
            <div><strong>{completedCount}</strong><span>Steps completed</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Learning progress illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-center">
            <span>✦</span>
            <strong>GROW</strong>
            <small>EVERY DAY</small>
          </div>
          <div className="floating-card float-one">
            <span className="float-icon">💡</span>
            <div><strong>New ideas</strong><small>Start exploring</small></div>
          </div>
          <div className="floating-card float-two">
            <span className="float-icon">🎯</span>
            <div><strong>Your next goal</strong><small>One step at a time</small></div>
          </div>
          <div className="floating-card float-three">
            <span className="float-icon">🚀</span>
            <div><strong>Keep growing</strong><small>Your journey matters</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR DIRECTION</span>
            <h2>Choose your next skill</h2>
            <p>Small steps today can lead to big opportunities tomorrow.</p>
          </div>
          <Link to="/explore" className="text-link">View all skills →</Link>
        </div>
        <div className="skill-grid">
          {featured.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              completed={progress[skill.id] || []}
            />
          ))}
        </div>
      </section>

      <section className="journey-banner">
        <div>
          <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
          <h2>You don't need to know everything. Just start.</h2>
          <p>Pick one skill, follow the roadmap, and make progress at your own pace.</p>
        </div>
        <Link to="/explore" className="button button-primary">Begin your journey →</Link>
      </section>
    </>
  )
}

function Explore({ progress }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = skills.filter((skill) => {
    const matchesCategory = category === 'All' || skill.category === category
    const matchesSearch =
      `${skill.title} ${skill.description} ${skill.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">THE SKILL LIBRARY</span>
        <h1>Explore your possibilities.</h1>
        <p>Find a learning path that matches your interests and goals.</p>
      </div>

      <div className="explore-tools">
        <label className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search skills..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <div className="filter-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`filter-button ${category === item ? 'filter-active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="results-label">{filtered.length} learning paths available</p>

      {filtered.length > 0 ? (
        <div className="skill-grid">
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              completed={progress[skill.id] || []}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🔎</span>
          <h3>No skills found</h3>
          <p>Try another search term or select a different category.</p>
          <button className="button button-secondary" onClick={() => {
            setSearch('')
            setCategory('All')
          }}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

function Roadmap({ progress, toggleLesson }) {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedId = params.get('skill') || skills[0].id
  const selectedSkill = skills.find((skill) => skill.id === selectedId) || skills[0]
  const completed = progress[selectedSkill.id] || []
  const percent = Math.round((completed.length / selectedSkill.lessons.length) * 100)

  function changeSkill(event) {
    setParams({ skill: event.target.value })
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR STEP-BY-STEP PLAN</span>
        <h1>Learning roadmap</h1>
        <p>Follow the lessons in order, and check them off as you learn.</p>
      </div>

      <div className="roadmap-layout">
        <aside className="roadmap-sidebar">
          <label className="field-label" htmlFor="skill-select">Select a learning path</label>
          <select id="skill-select" value={selectedSkill.id} onChange={changeSkill}>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>{skill.title}</option>
            ))}
          </select>
          <div className="roadmap-summary">
            <div className={`skill-icon ${selectedSkill.color}`}>{selectedSkill.icon}</div>
            <h3>{selectedSkill.title}</h3>
            <p>{selectedSkill.description}</p>
            <div className="progress-track large-track">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <strong>{percent}% completed</strong>
            <small>{completed.length} of {selectedSkill.lessons.length} lessons done</small>
          </div>
          <button className="button button-secondary full-button" onClick={() => navigate('/explore')}>
            Explore other skills
          </button>
        </aside>

        <div className="lesson-list">
          <div className="lesson-list-heading">
            <div>
              <span className="eyebrow">YOUR CHECKLIST</span>
              <h2>Learning milestones</h2>
            </div>
            <span className="tag">{selectedSkill.duration}</span>
          </div>

          {selectedSkill.lessons.map((lesson, index) => {
            const isDone = completed.includes(index)
            return (
              <label className={`lesson-row ${isDone ? 'lesson-done' : ''}`} key={lesson}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleLesson(selectedSkill.id, index)}
                />
                <span className="lesson-number">{isDone ? '✓' : String(index + 1).padStart(2, '0')}</span>
                <span className="lesson-text">
                  <strong>{lesson}</strong>
                  <small>{isDone ? 'Completed — great work!' : `Milestone ${index + 1}`}</small>
                </span>
                <span className="lesson-arrow">{isDone ? '✓' : '→'}</span>
              </label>
            )
          })}

          {percent === 100 && (
            <div className="completion-message">
              <span>🎉</span>
              <div>
                <strong>Learning path completed!</strong>
                <p>Excellent work. You can review the lessons or explore another skill.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Progress({ progress }) {
  const allLessons = skills.reduce((total, skill) => total + skill.lessons.length, 0)
  const completedLessons = skills.reduce(
    (total, skill) => total + (progress[skill.id] || []).length,
    0
  )
  const startedPaths = skills.filter((skill) => (progress[skill.id] || []).length > 0).length
  const percent = Math.round((completedLessons / allLessons) * 100)

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">EVERY STEP COUNTS</span>
        <h1>Your learning progress.</h1>
        <p>See how far you have come and decide what to learn next.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>📚</span><strong>{startedPaths}</strong><p>Paths started</p></div>
        <div className="stat-card"><span>✅</span><strong>{completedLessons}</strong><p>Lessons completed</p></div>
        <div className="stat-card"><span>🎯</span><strong>{percent}%</strong><p>Overall completion</p></div>
      </div>

      <div className="overall-card">
        <div className="overall-top">
          <div><span className="eyebrow">YOUR OVERALL JOURNEY</span><h2>Keep moving forward</h2></div>
          <strong className="overall-percent">{percent}%</strong>
        </div>
        <div className="progress-track overall-track">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <p>{completedLessons} of {allLessons} lessons completed across all learning paths.</p>
      </div>

      <div className="section-heading progress-heading">
        <div><h2>Progress by skill</h2><p>Continue where you left off.</p></div>
      </div>

      <div className="progress-paths">
        {skills.map((skill) => {
          const done = progress[skill.id] || []
          const value = Math.round((done.length / skill.lessons.length) * 100)
          return (
            <div className="progress-path" key={skill.id}>
              <div className={`skill-icon ${skill.color}`}>{skill.icon}</div>
              <div className="progress-path-main">
                <strong>{skill.title}</strong>
                <small>{done.length} of {skill.lessons.length} lessons</small>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div>
              </div>
              <span className="progress-value">{value}%</span>
              <Link className="small-link" to={`/roadmap?skill=${skill.id}`}>Continue →</Link>
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
      <div className="about-hero">
        <span className="eyebrow">ABOUT SKILLSPHERE</span>
        <h1>A better way to learn, <span className="gradient-text">one step at a time.</span></h1>
        <p>
          SkillSphere is a personal learning companion designed to make skill
          development clear, approachable and motivating.
        </p>
      </div>
      <div className="about-grid">
        <article className="about-card"><span>🧭</span><h3>Clear direction</h3><p>Break large goals into smaller learning milestones that are easier to follow.</p></article>
        <article className="about-card"><span>📈</span><h3>Visible progress</h3><p>Mark lessons complete and see your progress as you continue learning.</p></article>
        <article className="about-card"><span>🌱</span><h3>Learn at your pace</h3><p>Explore different subjects and choose a path that fits your interests.</p></article>
      </div>
      <div className="center-action">
        <h2>Ready to find your next skill?</h2>
        <Link to="/explore" className="button button-primary">Explore learning paths →</Link>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="empty-state not-found">
      <span>🧭</span>
      <h1>Page not found</h1>
      <p>The page you are looking for may have moved.</p>
      <Link to="/" className="button button-primary">Return home</Link>
    </section>
  )
}

export default function App() {
  const [progress, setProgress] = useState(readProgress)

  useEffect(() => {
    try {
      localStorage.setItem('skillsphere-progress', JSON.stringify(progress))
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [progress])

  function toggleLesson(skillId, lessonIndex) {
    setProgress((previous) => {
      const current = previous[skillId] || []
      const next = current.includes(lessonIndex)
        ? current.filter((index) => index !== lessonIndex)
        : [...current, lessonIndex]

      return { ...previous, [skillId]: next }
    })
  }

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home progress={progress} />} />
          <Route path="/explore" element={<Explore progress={progress} />} />
          <Route
            path="/roadmap"
            element={<Roadmap progress={progress} toggleLesson={toggleLesson} />}
          />
          <Route path="/progress" element={<Progress progress={progress} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
