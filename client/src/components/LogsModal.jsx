import dayjs from "dayjs";
import { Clock, X } from "lucide-react";
import { useApp } from "../store";

export default function LogsModal() {
  const { viewingLogs, closeLogs, logs } = useApp();

  if (!viewingLogs) return null;

  const eventLogs = logs.filter((l) => l.eventId === viewingLogs._id);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Event Update History</h3>
          <button onClick={closeLogs} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {eventLogs.length === 0 ? (
          <div className="no-events">No update history yet</div>
        ) : (
          <div className="logs-list">
            {eventLogs.map((log, i) => (
              <div key={i} className="log-item">
                <Clock className="icon-sm" />
                <div>
                  <p className="log-text">{log.message}</p>
                  <p className="log-time">
                    {dayjs(log.timestamp).format("MMM DD, YYYY hh:mm A")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
