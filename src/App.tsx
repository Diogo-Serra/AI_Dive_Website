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
    title: "Less sorting. More living.",
    copy: "The important messages, surfaced. The routine replies, drafted. Your inbox, a little lighter.",
  },
  {
    label: "Calendar",
    title: "A day that flows.",
    copy: "Scheduling, reminders, and the back-and-forth. Handled quietly, without taking over your day.",
  },
  {
    label: "Daily tasks",
    title: "A head start. Every day.",
    copy: "A quick briefing. A clear plan. The repetitive little things, already taken care of.",
  },
];

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
          vela<span>.</span>
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
          >
            <source src="/assets/vela-promo.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Small footprint. A little more freedom.</p>
            <h1 id="hero-title">
              Reclaim your time.
              <br />
              <span>Meet Vela.</span>
            </h1>
            <p className="hero-copy">
              Lightweight. Quick on its feet. Vela takes on your repetitive daily tasks, giving you
              time for what matters.
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
            <p>
              A small, agile companion for the things you do on repeat. Less effort. Fewer
              interruptions. More of your day back.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((feature, index) => (
              <article className="capability" key={feature.title}>
                <div className="capability-label">
                  <span>0{index + 1}</span>
                  <p className="eyebrow">{feature.label}</p>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
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
            <p>
              Tell Vela what you need. It takes care of the busywork—quickly, quietly, and without
              the extra steps.
            </p>
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
          vela<span>.</span>
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
