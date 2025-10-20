import { useEffect } from "react";
import CreateEvent from "./components/CreateEvent.jsx";
import EditEventModal from "./components/EditEventModal.jsx";
import EventList from "./components/EventList.jsx";
import LogsModal from "./components/LogsModal.jsx";
import { useApp } from "./store.js";

export default function App() {
  const {
    profiles,
    selectedTz,
    setSelectedTz,
    currentProfileId,
    setCurrentProfileId,
    timezones,
    loadAll,
  } = useApp();

  // ✅ Auto-detect timezone on first load
  useEffect(() => {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!selectedTz) {
      setSelectedTz(userTz);
    }

    if (loadAll) {
      loadAll();
    }
  }, []);

  return (
    <div className="app-wrapper">
      {/* === NAVBAR === */}
      <div className="navbar">
        <div className="navbar-left">
          <h1 className="brand">Event Management</h1>
          <span className="tagline">
            Create and manage events across multiple timezones
          </span>
        </div>

        <div className="navbar-right">
          {/* === Profile Selector === */}
          {profiles.length > 0 && (
            <select
              className="profile-select"
              value={currentProfileId || ""}
              onChange={(e) => setCurrentProfileId(e.target.value)}
            >
              <option value="">Select Profile</option>
              {profiles.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* === MAIN DASHBOARD === */}
      <div className="main-container">
        {/* === CREATE EVENT CARD === */}
        <div className="card">
          <h3>Create Event</h3>
          <CreateEvent />
        </div>

        {/* === EVENT LIST CARD === */}
        <div className="card">
          {/* Events Header with subtitle */}
          <div className="events-header">
            <div>
              <h3>Events</h3>
              <p className="muted">Showing times in {selectedTz}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                View in Timezone
              </span>
              <select
                className="select"
                value={selectedTz}
                onChange={(e) => setSelectedTz(e.target.value)}
                style={{ width: "200px" }}
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <EventList />
        </div>
      </div>

      {/* === MODALS === */}
      <EditEventModal />
      <LogsModal />
    </div>
  );
}
