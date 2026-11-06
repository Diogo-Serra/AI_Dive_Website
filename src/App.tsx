import { useEffect, useRef, useState } from "react";
import serviceImage from "../assets/ServiceVela.jpg";
import heroPoster from "../assets/VelaImage.jpg";
import soundtrack from "../assets/Dawn of a New Era.mp3";
import ServicePreview from "./ServicePreview";

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
    description: "Less sorting. More clarity.",
    details: [
      ["Find what matters", "Important messages, first."],
      ["Catch up quickly", "Long threads, briefly summarized."],
      ["Start with a draft", "Replies ready for your review."],
    ],
  },
  {
    label: "Calendar",
    title: "A day that flows.",
    description: "A plan with room to breathe.",
    details: [
      ["See the day ahead", "Your schedule, at a glance."],
      ["Make scheduling simpler", "Find a time that fits."],
      ["Protect your focus", "Focus blocks. Space between meetings."],
    ],
  },
  {
    label: "Daily tasks",
    title: "Already done.",
    description: "From loose ends to next steps.",
    details: [
      ["Begin with a briefing", "Your daily essentials, in one place."],
      ["Turn requests into a plan", "Everyday requests, clear next steps."],
      ["Keep follow-ups in view", "Nothing important slips through."],
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deployOpen, setDeployOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = 0.35;
    function removeFallback() {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    }
    function startOnInteraction(event: Event) {
      // The sound control manages its own playback; never override an opt-out.
      if (event.target instanceof Element && event.target.closest(".sound-toggle")) return;
      if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") return;
      void audio!.play().catch(() => {
        // Keep the manual play control available if playback is still blocked.
      });
    }
    document.addEventListener("click", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    audio.addEventListener("play", removeFallback, { once: true });
    void audio.play().catch(() => {
      // Browsers may require a visitor interaction before audible playback.
    });
    return () => {
      removeFallback();
      audio.removeEventListener("play", removeFallback);
    };
  }, []);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
    } catch {
      setAudioPlaying(false);
    }
  }

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
      <audio
        ref={audioRef}
        src={soundtrack}
        autoPlay
        preload="auto"
        loop={false}
        onPlay={() => {
          setAudioPlaying(true);
          setAudioEnded(false);
        }}
        onPause={() => setAudioPlaying(false)}
        onEnded={() => {
          setAudioPlaying(false);
          setAudioEnded(true);
        }}
        onError={() => setAudioError(true)}
      />
      <button
        className="sound-toggle"
        onClick={() => void toggleAudio()}
        disabled={audioError}
        aria-label={
          audioError
            ? "Music unavailable"
            : audioPlaying
              ? "Turn music off"
              : audioEnded
                ? "Replay music"
                : "Play music"
        }
        aria-pressed={audioPlaying}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m11 5-6 4H2v6h3l6 4z" />
          {audioPlaying ? (
            <>
              <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
            </>
          ) : (
            <path d="m16 9 6 6m0-6-6 6" />
          )}
        </svg>
        <span>
          {audioError
            ? "Music unavailable"
            : audioPlaying
              ? "Sound off"
              : audioEnded
                ? "Replay music"
                : "Play music"}
        </span>
      </button>
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
                  <ServicePreview type={index} />
                </div>
                <div className="capability-details">
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
