import { useEffect, useRef, useState } from "react";
import serviceImage from "../assets/ServiceVela.jpg";
import heroPoster from "../assets/VelaImage.jpg";

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

const capabilities = [
  {
    label: "Inbox",
    title: "Inbox, handled.",
    copy: "Only what needs you.",
    description: "Less sorting. More clarity.",
    details: [
      [
        "Find what matters",
        "Bring important conversations to the front, so requests and messages that need your attention don’t get lost in the noise.",
      ],
      [
        "Catch up quickly",
        "Get a concise summary of long email threads, with key decisions, questions, and next steps in one place.",
      ],
      [
        "Start with a draft",
        "Prepare replies to routine messages for you to review and edit, instead of starting from a blank page.",
      ],
    ],
  },
  {
    label: "Calendar",
    title: "A day that flows.",
    copy: "Space for what matters.",
    description: "A plan with room to breathe.",
    details: [
      [
        "See the day ahead",
        "Bring appointments, meetings, and open time into a clear daily view so you know what’s coming next.",
      ],
      [
        "Make scheduling simpler",
        "Find available time for an appointment or meeting and prepare the event details for your confirmation.",
      ],
      [
        "Protect your focus",
        "Plan dedicated time for deep work and leave breathing room between commitments, rather than filling every gap.",
      ],
    ],
  },
  {
    label: "Daily tasks",
    title: "Already done.",
    copy: "Little tasks. Off your mind.",
    description: "From loose ends to next steps.",
    details: [
      [
        "Begin with a briefing",
        "Get a short overview of your schedule, important messages, and outstanding tasks before the day gets busy.",
      ],
      [
        "Turn requests into a plan",
        "Organize everyday to-dos, such as booking an appointment, into clear actions with the details you need to move forward.",
      ],
      [
        "Keep follow-ups in view",
        "Track unfinished requests and prepare follow-up messages, so a small task doesn’t become something you forget.",
      ],
    ],
  },
];

function ServiceIcon({ type }: { type: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === 0 ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m3 7 9 6 9-6" />
        </>
      ) : type === 1 ? (
        <>
          <rect x="4" y="5" width="16" height="16" rx="3" />
          <path d="M8 3v4m8-4v4M4 11h16m-11 5 2 2 4-4" />
        </>
      ) : (
        <>
          <rect x="5" y="4" width="14" height="17" rx="3" />
          <path d="M9 4V2h6v2m-6 8 2 2 4-4m-6 7h6" />
        </>
      )}
    </svg>
  );
}

function CapabilityBoard({ type }: { type: number }) {
  if (type === 0)
    return (
      <div className="board inbox-board" aria-label="Example inbox organized by Vela">
        <div className="board-top">
          <div className="board-heading">
            <span className="board-kicker">YOUR MESSAGES, SIMPLIFIED</span>
            <span>Priority inbox</span>
          </div>
          <span className="board-tag">All clear</span>
        </div>
        <div className="inbox-filter">
          <span>
            Needs you <b>1</b>
          </span>
          <span>
            Handled by Vela <b>3</b>
          </span>
        </div>
        <div className="message-row">
          <span className="sender-avatar">J</span>
          <div>
            <b>Jamie</b>
            <span>Weekend plans?</span>
            <em>A personal note worth your time.</em>
          </div>
          <small>Just now</small>
        </div>
        <div className="message-row subdued">
          <span className="sender-avatar">S</span>
          <div>
            <b>Studio</b>
            <span>Your booking is confirmed</span>
          </div>
          <small>10:24</small>
        </div>
        <div className="board-summary">
          <span className="status-dot" />
          <div>
            <b>3 replies ready for review</b>
            <span>A head start. The final word is yours.</span>
          </div>
        </div>
      </div>
    );
  if (type === 1)
    return (
      <div className="board calendar-board" aria-label="Example day planned by Vela">
        <div className="board-top">
          <div className="board-heading">
            <span className="board-kicker">A LITTLE MORE BALANCE</span>
            <span>Your Wednesday</span>
          </div>
          <span className="board-tag">Balanced</span>
        </div>
        <div className="week-strip">
          {["M", "T", "W", "T", "F"].map((day, i) => (
            <div className={i === 2 ? "selected" : ""} key={i}>
              <span>{day}</span>
              <b>{12 + i}</b>
            </div>
          ))}
        </div>
        <div className="calendar-slot">
          <small>09:00</small>
          <div>
            <b>Time to focus</b>
            <span>Protected by Vela</span>
          </div>
        </div>
        <div className="calendar-slot secondary">
          <small>11:30</small>
          <div>
            <b>A little breathing room</b>
            <span>No meetings. Just a moment for you.</span>
          </div>
        </div>
        <div className="calendar-note">
          <span className="status-dot" />
          Focus time, without the rush.
        </div>
      </div>
    );
  return (
    <div className="board tasks-board" aria-label="Example daily tasks completed by Vela">
      <div className="board-top">
        <div className="board-heading">
          <span className="board-kicker">LESS ON YOUR MIND</span>
          <span>The little things</span>
        </div>
        <span className="board-tag">All done</span>
      </div>
      <div className="task-completion">
        <b>
          3 <span>/ 3</span>
        </b>
        <span>little wins today</span>
      </div>
      <div className="task-progress">
        <span />
      </div>
      {[
        ["Morning briefing prepared", "Your day, in one clear overview"],
        ["Appointment scheduled", "A time that fits your calendar"],
        ["Follow-up sent", "One less loose end to remember"],
      ].map(([task, note]) => (
        <div className="completed-task" key={task}>
          <span className="task-check">✓</span>
          <div>
            <b>{task}</b>
            <span>{note}</span>
          </div>
        </div>
      ))}
      <div className="tasks-note">You’re good to go.</div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deployOpen, setDeployOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function openDialog() {
    triggerRef.current = document.activeElement as HTMLElement;
    setSubmitted(false);
    setDeployOpen(true);
    setMenuOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (deployOpen) dialog?.showModal();
    else if (dialog?.open) dialog.close();
  }, [deployOpen]);

  return (
    <>
      <a className="skip-link" href="#capabilities">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Vela home">
          <span className="brand-name">
            vela<span>.</span>
          </span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>
            Capabilities
          </a>
          <a href="#intelligence" onClick={() => setMenuOpen(false)}>
            Meet Vela
          </a>
          <a href="#security" onClick={() => setMenuOpen(false)}>
            Privacy
          </a>
        </nav>
        <button className="nav-cta" onClick={openDialog}>
          Deploy Vela <ArrowIcon />
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(event) => {
              void event.currentTarget.play().catch(() => undefined);
            }}
          >
            <source src="/assets/vela-promo.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Small companion. Big difference.</p>
            <h1 id="hero-title">
              Your time.
              <br />
              <span>Back to you.</span>
            </h1>
            <p className="hero-copy">
              Meet Vela. Your lightweight AI companion for the everyday busywork.
            </p>
            <div className="hero-actions">
              <button className="button button-light" onClick={openDialog}>
                Deploy Vela <ArrowIcon />
              </button>
              <a href="#intelligence" className="text-link">
                Get to know Vela <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Intelligence that gives time back.</span>
            <a href="#capabilities" aria-label="Discover Vela’s capabilities">
              ↓
            </a>
          </div>
        </section>

        <section
          className="capabilities section-wrap"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="section-intro">
            <p className="eyebrow">Quietly powerful</p>
            <h2 id="capabilities-title">
              Less to do.
              <br />
              <span>More room for you.</span>
            </h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((feature, index) => (
              <article className="capability" key={feature.title}>
                <div className="capability-preview">
                  <div className="capability-label">
                    <span>0{index + 1}</span>
                    <p className="eyebrow">
                      <ServiceIcon type={index} />
                      {feature.label}
                    </p>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                  <CapabilityBoard type={index} />
                </div>
                <div className="capability-details">
                  <p className="eyebrow">What Vela helps you do</p>
                  <h4>{feature.description}</h4>
                  <dl>
                    {feature.details.map(([title, description]) => (
                      <div key={title}>
                        <dt>{title}</dt>
                        <dd>{description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="intelligence section-wrap"
          id="intelligence"
          aria-labelledby="intelligence-title"
        >
          <div className="intelligence-heading">
            <div>
              <p className="eyebrow">Meet your everyday companion</p>
              <h2 id="intelligence-title">
                Ask once.
                <br />
                Consider it done.
              </h2>
            </div>
            <p>A little help with the everyday. Just ask.</p>
          </div>
          <figure className="service-frame">
            <img
              src={serviceImage}
              alt="Vela, a small blue companion, organizing daily tasks, calendars, and briefings"
              loading="lazy"
              width="1376"
              height="768"
            />
          </figure>
        </section>

        <section className="security" id="security" aria-labelledby="security-title">
          <div className="security-inner section-wrap">
            <p className="eyebrow">Local by nature</p>
            <h2 id="security-title">Small enough to stay close.</h2>
            <p>
              Designed to run on your own device.
              <br />
              Light on resources. Big on getting things done.
            </p>
            <button className="button button-dark" onClick={openDialog}>
              Meet Vela <ArrowIcon />
            </button>
          </div>
        </section>
      </main>

      <footer className="section-wrap">
        <a className="brand" href="#" aria-label="Vela home">
          <span className="brand-name">
            vela<span>.</span>
          </span>
        </a>
        <p>Intelligence that gives time back.</p>
        <span>© {new Date().getFullYear()} Vela</span>
      </footer>

      <dialog
        ref={dialogRef}
        className="deploy-modal"
        onCancel={() => setDeployOpen(false)}
        onClose={() => {
          setDeployOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDeployOpen(false);
        }}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={() => setDeployOpen(false)} aria-label="Close">
            ×
          </button>
          <p className="eyebrow">Vela · Concept demo</p>
          <h2>Meet your new advantage.</h2>
          <p>A lighter way to take on the everyday. Imagined for life on your own device.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" required autoFocus />
            <button className="button button-dark" type="submit">
              Request access <ArrowIcon />
            </button>
          </form>
          <small role="status">
            {submitted
              ? "This is a demo. Your email has not been submitted."
              : "An imagination exercise. No email is collected."}
          </small>
        </div>
      </dialog>
    </>
  );
}
