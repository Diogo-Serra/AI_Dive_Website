import { useState } from "react";
import "./service-preview.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const plans = [
  ["Weekly planning", "Team catch-up"],
  ["Make something great", "Project check-in"],
  ["Time to focus", "Design catch-up"],
  ["Move things forward", "Coffee with Jamie"],
  ["Weekly wrap-up", "Weekly reflection"],
];
const taskItems = [
  {
    title: "Morning briefing",
    time: "08:00",
    detail: "2 meetings. 1 priority message. Afternoon free.",
  },
  {
    title: "Appointment booked",
    time: "08:12",
    detail: "Studio · Thursday, 15 May · 14:00",
  },
  {
    title: "Follow-up sent",
    time: "08:24",
    detail: "Studio appointment confirmed.",
  },
];

function InboxPreview() {
  const [view, setView] = useState("priority");
  return (
    <>
      <div className="sp-heading">
        <div>
          <h4>Priority inbox</h4>
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
                </div>
                <strong>Weekend plans?</strong>
              </div>
            </div>
            <div className="sp-mail">
              <span className="sp-avatar sp-avatar-blue">S</span>
              <div>
                <div className="sp-mail-meta">
                  <b>Studio</b>
                </div>
                <strong>Booking confirmed</strong>
              </div>
              <span className="sp-mail-check" aria-label="Organized">
                ✓
              </span>
            </div>
            <div className="sp-mail sp-mail-muted">
              <span className="sp-avatar sp-avatar-sand">N</span>
              <div>
                <b>The Weekly Edit</b>
              </div>
              <span className="sp-mail-saved">Saved</span>
            </div>
          </>
        ) : (
          <div className="sp-draft">
            <div className="sp-draft-top">
              <span className="sp-pill">Ready for review</span>
              <small>1 of 3</small>
            </div>
            <p className="sp-draft-to">To Studio</p>
            <p>Thanks for confirming! Thursday at 2 works perfectly.</p>
          </div>
        )}
      </div>
      <div className="sp-insight">
        <span className="sp-insight-symbol">✦</span>
        <div>
          <b>{view === "priority" ? "3 replies drafted for you" : "You review. You send."}</b>
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
          <h4>Your week</h4>
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
              <span className="sp-event-duration">90 min</span>
            </div>
            <b>{plans[day][0]}</b>
          </div>
        </div>
        <div className="sp-agenda-row">
          <time>10:30</time>
          <div className="sp-breath">
            <span />
            Free time
            <span />
          </div>
        </div>
        <div className="sp-agenda-row">
          <time>11:00</time>
          <div className="sp-event sp-event-meeting">
            <div>
              <b>{plans[day][1]}</b>
              <span className="sp-event-duration">30 min</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sp-insight">
        <span className="sp-insight-symbol">✦</span>
        <div>
          <b>Focus time protected</b>
        </div>
      </div>
    </>
  );
}

function TasksPreview() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <>
      <div className="sp-heading">
        <div>
          <h4>The little things</h4>
        </div>
      </div>
      <div className="sp-task-summary">
        <div className="sp-completion-ring">
          <span>
            3<small>of 3</small>
          </span>
        </div>
        <div>
          <b>All done.</b>
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
            </div>
          </div>
        ))}
      </div>
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
        <span className="sp-demo">Demo</span>
      </div>
      <div className="sp-body">
        {type === 0 ? <InboxPreview /> : type === 1 ? <CalendarPreview /> : <TasksPreview />}
      </div>
    </div>
  );
}
