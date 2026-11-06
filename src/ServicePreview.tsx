import { useState } from "react";
import "./service-preview.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const plans = [
  ["Weekly planning", "A fresh start, with a clear plan.", "Team catch-up"],
  ["Make something great", "A quiet block for your best work.", "Project check-in"],
  ["Time to focus", "Your most important work comes first.", "Design catch-up"],
  ["Move things forward", "Space to finish what you started.", "Coffee with Jamie"],
  ["Finish on a good note", "Wrap up the week without the rush.", "Weekly reflection"],
];
const taskItems = [
  {
    title: "Morning briefing",
    subtitle: "Your day, neatly summarized",
    time: "08:00",
    detail:
      "Two meetings, one important message, and a clear afternoon. Your briefing brings the essentials together before you begin.",
    action: "Briefing prepared",
  },
  {
    title: "Appointment booked",
    subtitle: "A time that works for you",
    time: "08:12",
    detail:
      "Studio appointment · Thursday, 15 May at 14:00. The confirmation and appointment details are together in your calendar.",
    action: "Added to calendar",
  },
  {
    title: "Follow-up sent",
    subtitle: "One less thing to remember",
    time: "08:24",
    detail:
      "A short follow-up to the studio, confirming your appointment details. The conversation is ready whenever you need it.",
    action: "Follow-up complete",
  },
];

function InboxPreview() {
  const [view, setView] = useState("priority");
  return (
    <>
      <div className="sp-heading">
        <div>
          <p className="sp-overline">A little less noise</p>
          <h4>Your inbox, in order.</h4>
        </div>
        <span className="sp-count">04</span>
      </div>
      <div className="sp-tabs" role="group" aria-label="Example inbox views">
        <button
          type="button"
          aria-pressed={view === "priority"}
          onClick={() => setView("priority")}
        >
          Needs you <span>1</span>
        </button>
        <button type="button" aria-pressed={view === "drafts"} onClick={() => setView("drafts")}>
          Drafts ready <span>3</span>
        </button>
      </div>
      <div className="sp-inbox-content" aria-live="polite">
        {view === "priority" ? (
          <>
            <div className="sp-mail sp-mail-featured">
              <span className="sp-avatar">J</span>
              <div>
                <div className="sp-mail-meta">
                  <b>Jamie</b>
                  <small>Just now</small>
                </div>
                <strong>Weekend plans?</strong>
                <p>Shall we try that little place by the water?</p>
                <span className="sp-pill">
                  <i />
                  Personal · worth your time
                </span>
              </div>
            </div>
            <div className="sp-mail">
              <span className="sp-avatar sp-avatar-blue">S</span>
              <div>
                <div className="sp-mail-meta">
                  <b>Studio</b>
                  <small>10:24</small>
                </div>
                <strong>Your booking is confirmed</strong>
                <p>Appointment details, already organized.</p>
              </div>
              <span className="sp-mail-check" aria-label="Organized">
                ✓
              </span>
            </div>
            <div className="sp-mail sp-mail-muted">
              <span className="sp-avatar sp-avatar-sand">N</span>
              <div>
                <b>The Weekly Edit</b>
                <p>A little reading, saved for later.</p>
              </div>
              <span className="sp-mail-saved">Saved</span>
            </div>
          </>
        ) : (
          <div className="sp-draft">
            <div className="sp-draft-top">
              <span className="sp-pill">Draft · ready for review</span>
              <small>1 of 3</small>
            </div>
            <p className="sp-draft-to">
              To Studio <span>· Re: Your booking</span>
            </p>
            <p>Thanks for confirming! Thursday at 2 works perfectly. Looking forward to it.</p>
            <div className="sp-draft-signature">Prepared by Vela. Sent only when you’re ready.</div>
          </div>
        )}
      </div>
      <div className="sp-insight">
        <span className="sp-insight-symbol">✦</span>
        <div>
          <b>
            {view === "priority"
              ? "The important things rise to the top."
              : "A head start, in your own words."}
          </b>
          <p>
            {view === "priority"
              ? "Less sorting. More space for a real conversation."
              : "Review and edit before anything is sent."}
          </p>
        </div>
      </div>
    </>
  );
}

function CalendarPreview() {
  const [day, setDay] = useState(2);
  return (
    <>
      <div className="sp-heading">
        <div>
          <p className="sp-overline">May 12 — 16 · Example week</p>
          <h4>A day with breathing room.</h4>
        </div>
      </div>
      <div className="sp-week" role="group" aria-label="Explore an example week">
        {days.map((name, index) => (
          <button
            type="button"
            key={name}
            aria-label={`${name}, May ${12 + index}`}
            aria-pressed={day === index}
            onClick={() => setDay(index)}
          >
            <span>{name.slice(0, 3)}</span>
            <b>{12 + index}</b>
            <i />
          </button>
        ))}
      </div>
      <div className="sp-agenda" aria-live="polite" aria-label={`${days[day]} schedule`}>
        <div className="sp-agenda-row">
          <time>09:00</time>
          <div className="sp-event sp-event-focus">
            <div>
              <span className="sp-event-category">FOCUS TIME</span>
              <span className="sp-event-duration">90 min</span>
            </div>
            <b>{plans[day][0]}</b>
            <p>{plans[day][1]}</p>
            <span className="sp-protected">◇ Protected by Vela</span>
          </div>
        </div>
        <div className="sp-agenda-row">
          <time>10:30</time>
          <div className="sp-breath">
            <span />A little breathing room
            <span />
          </div>
        </div>
        <div className="sp-agenda-row">
          <time>11:00</time>
          <div className="sp-event sp-event-meeting">
            <div>
              <b>{plans[day][2]}</b>
              <span className="sp-event-duration">30 min</span>
            </div>
            <p>Time to connect, without the back-to-back.</p>
          </div>
        </div>
      </div>
      <div className="sp-insight">
        <span className="sp-insight-symbol">✦</span>
        <div>
          <b>Your time is part of the plan.</b>
          <p>Focus protected. Space between commitments.</p>
        </div>
      </div>
    </>
  );
}

function TasksPreview() {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <>
      <div className="sp-heading">
        <div>
          <p className="sp-overline">Your everyday, a little lighter</p>
          <h4>Small things. Taken care of.</h4>
        </div>
      </div>
      <div className="sp-task-summary">
        <div className="sp-completion-ring">
          <span>
            3<small>of 3</small>
          </span>
        </div>
        <div>
          <b>A clear list. A clearer head.</b>
          <p>All your little tasks, wrapped up.</p>
          <span className="sp-pill">✓ You’re good to go</span>
        </div>
      </div>
      <div className="sp-task-list">
        {taskItems.map((task, index) => (
          <div className={`sp-task ${expanded === index ? "is-expanded" : ""}`} key={task.title}>
            <button
              type="button"
              aria-expanded={expanded === index}
              aria-controls={`task-example-${index}`}
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <span className="sp-check">✓</span>
              <span className="sp-task-name">
                <b>{task.title}</b>
                <span>{task.subtitle}</span>
              </span>
              <time>{task.time}</time>
              <span className="sp-chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
            <div
              id={`task-example-${index}`}
              hidden={expanded !== index}
              className="sp-task-detail"
            >
              <p>{task.detail}</p>
              <span>
                {task.action} <span aria-hidden="true">↗</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="sp-task-footer">A few less things to carry into your day.</div>
    </>
  );
}

export default function ServicePreview({ type }: { type: number }) {
  return (
    <div className={`service-preview sp-theme-${type}`}>
      <div className="sp-chrome">
        <span className="sp-wordmark">
          vela<span>.</span>
        </span>
        <span className="sp-chrome-label">Your everyday companion</span>
        <span className="sp-demo">Interactive demo</span>
      </div>
      <div className="sp-body">
        {type === 0 ? <InboxPreview /> : type === 1 ? <CalendarPreview /> : <TasksPreview />}
      </div>
      <div className="sp-bottom">
        <span>
          <i />A glimpse of life with Vela
        </span>
        <span>Made for your everyday</span>
      </div>
    </div>
  );
}
