import { useEffect, useState, type ReactNode } from "react";

function Buddy({ className = "" }: { className?: string }) {
  return (
    <span className={`buddy ${className}`} aria-hidden="true">
      <img src="/assets/vela-buddy.png" alt="" />
    </span>
  );
}

function Icon({
  children,
  className = "",
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <Icon className="size-4">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </Icon>
  );
}

function InboxCard() {
  return (
    <article className="feature-card inbox-card reveal">
      <div className="card-copy">
        <div className="feature-icon cyan">
          <Icon className="size-5">
            <path d="M4 5h16v13H4z" />
            <path d="m4 13 4-4 4 4 4-4 4 4" />
          </Icon>
        </div>
        <p className="eyebrow">Communication</p>
        <h3>Smart Inbox Management</h3>
        <p>
          Vela sorts the signal from the noise, drafts replies, and brings only the decisions that
          need you.
        </p>
      </div>
      <div className="inbox-ui" aria-hidden="true">
        <div className="inbox-top">
          <span>Priority inbox</span>
          <span className="live-dot">Live</span>
        </div>
        {[
          ["MC", "Maya Chen", "Q4 launch decision", "Now", "cyan"],
          ["AS", "Alex Stone", "Re: Product review", "8m", ""],
          ["LM", "Lumen AI", "Weekly systems report", "24m", ""],
        ].map(([initials, name, subject, time, color]) => (
          <div className={`mail-row ${color}`} key={name}>
            <span className="avatar">{initials}</span>
            <span className="mail-copy">
              <b>{name}</b>
              <small>{subject}</small>
            </span>
            <span className="mail-time">{time}</span>
          </div>
        ))}
        <div className="vela-action">
          <Buddy className="buddy-mini" /> Vela drafted a reply <span>Review</span>
        </div>
      </div>
    </article>
  );
}

function CalendarCard() {
  return (
    <article className="feature-card calendar-card reveal">
      <div className="card-copy">
        <div className="feature-icon amber">
          <Icon className="size-5">
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M8 3v4M16 3v4M3.5 10h17" />
          </Icon>
        </div>
        <p className="eyebrow">Time</p>
        <h3>Calendar Orchestration</h3>
        <p>Plans your day around focus, energy, and momentum—not just open slots.</p>
      </div>
      <div className="calendar-ui" aria-hidden="true">
        <div className="calendar-head">
          <span>Tuesday, 14 May</span>
          <b>72% focus</b>
        </div>
        <div className="schedule">
          <span className="time">09</span>
          <span className="line" />
          <span className="time t2">10</span>
          <span className="line l2" />
          <span className="time t3">11</span>
          <span className="line l3" />
          <div className="event focus">
            <small>09:00 — 10:30</small>
            <strong>Deep work · Vela protected</strong>
          </div>
          <div className="event sync">
            <small>10:45</small>
            <strong>Design sync</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

function BriefingCard() {
  return (
    <article className="feature-card briefing-card reveal">
      <div className="card-copy">
        <div className="feature-icon silver">
          <Icon className="size-5">
            <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
          </Icon>
        </div>
        <p className="eyebrow">Intelligence</p>
        <h3>Daily Briefings</h3>
        <p>Wake up to a concise, actionable view of the day—already prioritized.</p>
      </div>
      <div className="brief-ui" aria-hidden="true">
        <div className="brief-head">
          <span>Good morning, Alex</span>
          <small>07:30 · Tuesday</small>
        </div>
        <div className="metric-row">
          <div>
            <strong>04</strong>
            <small>Priorities</small>
          </div>
          <div>
            <strong>2h 40m</strong>
            <small>Focus time</small>
          </div>
          <div>
            <strong>08</strong>
            <small>Handled</small>
          </div>
        </div>
        <div className="chart">
          <svg viewBox="0 0 360 95" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#5FE4F0" stopOpacity=".34" />
                <stop offset="1" stopColor="#5FE4F0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 84C48 72 60 83 101 59c45-26 61 4 101-23 47-31 83 23 158-30v89H0Z"
              fill="url(#chartFill)"
            />
            <path
              d="M0 84C48 72 60 83 101 59c45-26 61 4 101-23 47-31 83 23 158-30"
              stroke="#70E8F2"
              strokeWidth="2"
            />
          </svg>
          <span>+18% capacity gained this week</span>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deployOpen, setDeployOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setDeployOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Vela home">
          <Buddy className="brand-mark" />
          <span>Vela</span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>
            Capabilities
          </a>
          <a href="#intelligence" onClick={() => setMenuOpen(false)}>
            Intelligence
          </a>
          <a href="#security" onClick={() => setMenuOpen(false)}>
            Security
          </a>
        </nav>
        <button className="nav-cta" onClick={() => setDeployOpen(true)}>
          Deploy Vela <ArrowIcon />
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/vela-hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={(event) => void event.currentTarget.play().catch(() => undefined)}
        >
          <source src="/assets/vela-promo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="ambient orb-one" />
        <div className="ambient orb-two" />
        <div className="hero-content">
          <div className="status-pill">
            <span />
            <b>Vela OS 2.0</b> Now available
          </div>
          <h1 id="hero-title">
            Reclaim Your Time
            <br />
            <span>with Vela</span>
          </h1>
          <p className="hero-copy">
            The intelligent automation layer that quietly orchestrates your work, protects your
            focus, and gives your day back.
          </p>
          <div className="hero-actions">
            <button className="deploy-button" onClick={() => setDeployOpen(true)}>
              <span>Deploy Vela</span>
              <ArrowIcon />
            </button>
            <a href="#capabilities" className="text-link">
              Explore capabilities <ArrowIcon />
            </a>
          </div>
          <div className="trust-line">
            <span className="avatar-stack">
              <i>MK</i>
              <i>LR</i>
              <i>ST</i>
            </span>
            <span>
              <b>12,000+</b> hours reclaimed this week
            </span>
          </div>
        </div>
        <div className="hero-system" aria-hidden="true">
          <span className="system-label">Vela is thinking</span>
          <span className="wave">
            {Array.from({ length: 11 }).map((_, i) => (
              <i key={i} />
            ))}
          </span>
          <span className="system-task">Optimizing your Wednesday</span>
        </div>
        <div className="scroll-note">
          <span /> Scroll to discover
        </div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="section-intro reveal">
          <div>
            <p className="section-kicker">
              <span /> Quietly powerful
            </p>
            <h2>
              One intelligent layer.
              <br />
              Every part of your day.
            </h2>
          </div>
          <p>
            Vela learns how you work, then removes the friction around it. Always present. Never in
            the way.
          </p>
        </div>
        <div className="bento-grid">
          <InboxCard />
          <CalendarCard />
          <BriefingCard />
          <article className="feature-card command-card reveal" id="intelligence">
            <div className="command-copy">
              <p className="eyebrow">Ambient intelligence</p>
              <h3>
                Ask once.
                <br />
                Consider it done.
              </h3>
              <p>
                Natural language in. Coordinated action out. Vela understands context across every
                tool you use.
              </p>
              <div className="command-input">
                <span className="voice-orb">
                  <i />
                </span>
                <span>Prepare me for the product review</span>
                <kbd>⌘ ↵</kbd>
              </div>
              <div className="task-chips">
                <span>8 sources analyzed</span>
                <span>Brief prepared</span>
                <span>Team notified</span>
              </div>
            </div>
            <div className="mascot-stage">
              <img
                className="service-art"
                src="/assets/vela-service.jpg"
                alt="Vela coordinating tasks, calendars, messages, and automation"
              />
              <div className="service-art-shade" aria-hidden="true" />
              <div className="holo-card one">
                <span>Brief ready</span>
                <strong>Product Review</strong>
                <small>12 sources · 6 min read</small>
              </div>
              <div className="holo-card two">
                <span>Next up</span>
                <strong>Design sync</strong>
                <small>in 24 minutes</small>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="security" id="security">
        <div className="security-inner reveal">
          <div className="security-mark">
            <Buddy />
          </div>
          <p className="section-kicker">
            <span /> Private by design
          </p>
          <h2>Your work stays yours.</h2>
          <p>
            Enterprise-grade encryption. Granular controls. Zero training on your data. Vela’s
            intelligence works for you—not from you.
          </p>
          <div className="security-points">
            <span>
              <i /> SOC 2 Type II
            </span>
            <span>
              <i /> End-to-end encrypted
            </span>
            <span>
              <i /> SSO &amp; SCIM
            </span>
          </div>
        </div>
      </section>

      <footer>
        <a className="official-brand" href="#" aria-label="Vela home">
          <img src="/assets/vela-logo.jpg" alt="Vela" />
        </a>
        <p>Intelligence that gives time back.</p>
        <span>© 2025 Vela Systems</span>
      </footer>

      {deployOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setDeployOpen(false)}
        >
          <div
            className="deploy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deploy-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setDeployOpen(false)} aria-label="Close">
              ×
            </button>
            <div className="modal-mark">
              <Buddy />
            </div>
            <p className="section-kicker">
              <span /> Private access
            </p>
            <h2 id="deploy-title">Meet your new advantage.</h2>
            <p>Join the priority list for a personalized Vela deployment.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setDeployOpen(false);
              }}
            >
              <label>
                <span>Work email</span>
                <input type="email" placeholder="you@company.com" required autoFocus />
              </label>
              <button className="deploy-button" type="submit">
                <span>Request access</span>
                <ArrowIcon />
              </button>
            </form>
            <small>No spam. Just a note when your workspace is ready.</small>
          </div>
        </div>
      )}
    </main>
  );
}
