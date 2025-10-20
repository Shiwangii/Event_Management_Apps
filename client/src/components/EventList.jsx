import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { CalendarDays, Clock, Edit3, FileText, User2 } from "lucide-react";
import { useApp } from "../store";

// ✅ Properly initialize plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function EventList() {
  // ✅ Use `selectedTz` (not `viewTz`)
  const { events = [], profiles = [], selectedTz, openEdit, openLogs } = useApp();

  // === Helper: Get profile name(s)
  const profileName = (e) => {
    const ids =
      Array.isArray(e.profiles) && e.profiles.length
        ? e.profiles
        : e.profileId
        ? [e.profileId]
        : [];
    const names = ids
      .map((id) => profiles.find((p) => p._id === id)?.name)
      .filter(Boolean);
    return names.length ? names.join(", ") : "Unknown";
  };

  // === Formatters (respect timezone)
  const fmtDate = (iso) =>
    iso ? dayjs.utc(iso).tz(selectedTz).format("MMM DD, YYYY") : "—";
  const fmtTime = (iso) =>
    iso ? dayjs.utc(iso).tz(selectedTz).format("hh:mm A") : "—";

  if (!events || events.length === 0) {
    return <div className="no-events">No events found</div>;
  }

  return (
    <div className="events-stack">
      {events.map((ev) => (
        <div key={ev._id} className="event-card">
          {/* === Header === */}
          <div className="event-card__head">
            <div className="event-card__title">
              <User2 className="icon" />
              <span>{profileName(ev)}</span>
            </div>
            <span className="event-card__badge">{selectedTz}</span>
          </div>

          {/* === Start Time === */}
          <div className="event-card__row">
            <CalendarDays className="icon" />
            <div className="event-card__row-text">
              <div className="label">Start</div>
              <div className="value">
                {fmtDate(ev.start)} <span className="dot">•</span>{" "}
                {fmtTime(ev.start)}
              </div>
            </div>
          </div>

          {/* === End Time === */}
          <div className="event-card__row">
            <CalendarDays className="icon" />
            <div className="event-card__row-text">
              <div className="label">End</div>
              <div className="value">
                {fmtDate(ev.end)} <span className="dot">•</span>{" "}
                {fmtTime(ev.end)}
              </div>
            </div>
          </div>

          <div className="event-divider" />

          {/* === Meta === */}
          <div className="event-meta">
            <div>
              <Clock className="icon-sm" />
              <span className="muted">
                Created:{" "}
                {dayjs
                  .utc(ev.createdAt)
                  .tz(selectedTz)
                  .format("MMM DD, YYYY hh:mm A")}
              </span>
            </div>
            <div>
              <Clock className="icon-sm" />
              <span className="muted">
                Updated:{" "}
                {dayjs
                  .utc(ev.updatedAt)
                  .tz(selectedTz)
                  .format("MMM DD, YYYY hh:mm A")}
              </span>
            </div>
          </div>

          {/* === Actions === */}
          <div className="event-actions">
            <button className="event-btn" onClick={() => openEdit?.(ev)}>
              <Edit3 /> <span>Edit</span>
            </button>
            <button className="event-btn" onClick={() => openLogs?.(ev)}>
              <FileText /> <span>View Logs</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
