import dayjs from "dayjs";
import { Calendar, CheckCircle, Clock, X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { useApp } from "../store";

export default function CreateEvent() {
  const {
    profiles,
    addProfile,
    createEvent,
    timezones,
    selectedTz,
    setSelectedTz,
  } = useApp();

  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("09:00");

  // Modal + Toast states
  const [showModal, setShowModal] = useState(false);
  const [newProfile, setNewProfile] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleAddProfile = () => {
    if (!newProfile.trim()) return;
    addProfile(newProfile.trim());
    setNewProfile("");
    setShowModal(false);

    // ✅ Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleCreateEvent = () => {
    if (!selectedProfiles.length || !startDate || !endDate) return;

    const start = dayjs(`${startDate} ${startTime}`).toISOString();
    const end = dayjs(`${endDate} ${endTime}`).toISOString();

    if (dayjs(end).isBefore(dayjs(start))) {
      alert("End date/time cannot be before Start date/time!");
      return;
    }

    createEvent({
      profiles: selectedProfiles.map((p) => p.value),
      timezone: selectedTz,
      start,
      end,
    });

    setSelectedProfiles([]);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="card">
      <h3>Create Event</h3>

      {/* === PROFILES === */}
      <label>Profiles</label>
      <div className="add-profile-row">
        <Select
          isMulti
          placeholder="Select profiles..."
          className="select-profiles"
          value={selectedProfiles}
          onChange={setSelectedProfiles}
          options={profiles.map((p) => ({ value: p._id, label: p.name }))}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "8px",
              borderColor: "#e5e7eb",
              background: "#fafbff",
              fontSize: "14px",
              boxShadow: "none",
            }),
          }}
        />
        <button className="add-profile-btn" onClick={() => setShowModal(true)}>
          + Add Profile
        </button>
      </div>

      {/* === TIMEZONE === */}
      <label>Timezone</label>
      <select
        className="select"
        value={selectedTz}
        onChange={(e) => setSelectedTz(e.target.value)}
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>

      {/* === START DATETIME === */}
      <label>Start Date & Time</label>
      <div className="form-row">
        <div style={{ flex: 1, position: "relative" }}>
          <Calendar
            size={16}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="date"
            className="input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Clock
            size={16}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="time"
            className="time-input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
      </div>

      {/* === END DATETIME === */}
      <label>End Date & Time</label>
      <div className="form-row">
        <div style={{ flex: 1, position: "relative" }}>
          <Calendar
            size={16}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="date"
            className="input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Clock
            size={16}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="time"
            className="time-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
      </div>

      {/* === CREATE BUTTON === */}
      <button
        className="btn"
        onClick={handleCreateEvent}
        disabled={!selectedProfiles.length || !startDate || !endDate}
      >
        + Create Event
      </button>

      {/* === ADD PROFILE MODAL === */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h4>Add Profile</h4>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter profile name"
              className="input"
              value={newProfile}
              onChange={(e) => setNewProfile(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleAddProfile}
                disabled={!newProfile.trim()}
              >
                Add Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === SUCCESS TOAST === */}
      {showToast && (
        <div className="toast">
          <CheckCircle size={18} />
          <span>Profile added successfully</span>
        </div>
      )}
    </div>
  );
}
