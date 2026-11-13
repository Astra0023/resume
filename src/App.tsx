import { lazy, Suspense } from "react";
import { education, experience, profile, projects, skills } from "./data";
import { useTheme } from "./useTheme";

const Scene = lazy(() => import("./Scene"));

const YEAR = new Date().getFullYear();
const NAV = [
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
];

function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  return theme === "dark" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
    </svg>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  const mailto = `mailto:${profile.email}`;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <a href="#top" className="logo" aria-label={`${profile.name}, home`}>
          JT<span>.</span>
        </a>
        <nav aria-label="Primary">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
        <button
          className="theme-btn"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <ThemeIcon theme={theme} />
        </button>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-text">
            <p className="eyebrow">
              <span className="status-dot" /> Software engineer · Full stack
            </p>
            <h1>
              Building useful things for a <span>connected world.</span>
            </h1>
            <p className="hero-name">{profile.name}</p>
            <p className="hero-summary">{profile.objective}</p>
            <div className="cta">
              <a className="btn primary" href={mailto}>
                Get in touch <span aria-hidden="true">↗</span>
              </a>
              <a className="btn" href="#projects">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <span className="meta-icon" aria-hidden="true">
                  ⌖
                </span>{" "}
                {profile.location}
              </span>
              <span>
                <span className="meta-icon" aria-hidden="true">
                  ✳
                </span>{" "}
                React · TypeScript · .NET · Azure
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="scene-frame">
              <div className="scene-label">
                <span>01</span> Product thinking, end to end
              </div>
              <Suspense
                fallback={<div className="loading">Preparing the scene…</div>}
              >
                <Scene theme={theme} />
              </Suspense>
              <div className="scene-caption">
                From interface to infrastructure <span>↗</span>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span /> Scroll to explore
          </a>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">A little about me</p>
            <h2>
              Thoughtful software.
              <br />
              <span>Real-world impact.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p className="lead">
              I build dependable, human-centered software across the full stack.
              From a polished interface to the services and data behind it, I
              enjoy turning complex workflows into products people can rely on.
            </p>
            <p className="muted">
              My experience spans enterprise platforms, cloud integrations, and
              real-time tools. I value clear communication, practical
              engineering, and thoughtful details at every stage.
            </p>
            <ul className="stats">
              <li>
                <strong>
                  3<span>+</span>
                </strong>
                <span>years in software</span>
              </li>
              <li>
                <strong>{projects.length.toString().padStart(2, "0")}</strong>
                <span>featured projects</span>
              </li>
              <li>
                <strong>{experience.length.toString().padStart(2, "0")}</strong>
                <span>career experiences</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-topline">
            <div className="section-heading">
              <p className="eyebrow">Where I've worked</p>
              <h2>Experience</h2>
            </div>
            <span className="section-index">02 / 06</span>
          </div>
          <ol className="timeline">
            {experience.map((job, index) => (
              <li key={job.company + job.period} className="timeline-item">
                <span className="timeline-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article className="experience-card">
                  <div className="row">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="company">
                        {job.company} <span>·</span> {job.location}
                      </p>
                    </div>
                    <span className="period">{job.period}</span>
                  </div>
                  <ul className="detail-list">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-topline">
            <div className="section-heading">
              <p className="eyebrow">Tools of the trade</p>
              <h2>Skills &amp; technologies</h2>
            </div>
            <span className="section-index">03 / 06</span>
          </div>
          <div className="skill-grid">
            {Object.entries(skills).map(([group, items], index) => (
              <article key={group} className="skill-card">
                <span className="card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-topline">
            <div className="section-heading">
              <p className="eyebrow">Selected work</p>
              <h2>Things I've helped build</h2>
            </div>
            <span className="section-index">04 / 06</span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article key={project.title} className="project-card">
                <div className="project-card-top">
                  <span className="card-index">0{index + 1}</span>
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <ul className="chips">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className="project-link"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live site <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="section-topline">
            <div className="section-heading">
              <p className="eyebrow">The foundation</p>
              <h2>Education</h2>
            </div>
            <span className="section-index">05 / 06</span>
          </div>
          <div className="education-list">
            {education.map((item) => (
              <article key={item.school} className="education-item">
                <div>
                  <h3>{item.school}</h3>
                  <p>{item.degree}</p>
                </div>
                <span className="period">{item.period}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="eyebrow">Have something in mind?</p>
          <h2>
            Let's make it
            <br />
            <span>work beautifully.</span>
          </h2>
          <p className="contact-copy">
            I’m always happy to connect about good ideas, interesting
            challenges, and thoughtful software.
          </p>
          <a className="btn primary" href={mailto}>
            Say hello <span aria-hidden="true">↗</span>
          </a>
          <a className="contact-email" href={mailto}>
            {profile.email}
          </a>
          <span className="section-index">06 / 06</span>
        </section>
      </main>

      <footer className="footer">
        <a href="#top" className="logo">
          JT<span>.</span>
        </a>
        <p>
          Designed &amp; built with care · © {YEAR} {profile.name}
        </p>
        <a href="#top" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
