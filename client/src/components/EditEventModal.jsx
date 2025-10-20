import dayjs from "dayjs";
import { Calendar, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useApp } from "../store";

export default function EditEventModal() {
  const {
    editingEvent,
    profiles,
    timezones,
    closeEdit,
    updateEvent,
  } = useApp();

  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setSelectedProfiles(
        profiles
          .filter((p) => editingEvent.profiles.includes(p._id))
          .map((p) => ({ value: p._id, label: p.name }))
      );
      setTimezone(editingEvent.timezone);
      setStartDate(dayjs(editingEvent.start).format("YYYY-MM-DD"));
      setStartTime(dayjs(editingEvent.start).format("HH:mm"));
      setEndDate(dayjs(editingEvent.end).format("YYYY-MM-DD"));
      setEndTime(dayjs(editingEvent.end).format("HH:mm"));
    }
  }, [editingEvent, profiles]);

  if (!editingEvent) return null;

  const handleUpdate = () => {
    const start = dayjs(`${startDate} ${startTime}`).toISOString();
    const end = dayjs(`${endDate} ${endTime}`).toISOString();

    updateEvent(editingEvent._id, {
      profiles: selectedProfiles.map((p) => p.value),
      timezone,
      start,
      end,
    });

    closeEdit();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Event</h3>
          <button onClick={closeEdit} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <label>Profiles</label>
        <Select
          isMulti
          options={profiles.map((p) => ({ value: p._id, label: p.name }))}
          value={selectedProfiles}
          onChange={setSelectedProfiles}
        />

        <label>Timezone</label>
        <select
          className="select"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>

        <label>Start Date & Time</label>
        <div className="form-row">
          <div style={{ flex: 1, position: "relative" }}>
            <Calendar className="icon" />
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Clock className="icon" />
            <input
              type="time"
              className="time-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
        </div>

        <label>End Date & Time</label>
        <div className="form-row">
          <div style={{ flex: 1, position: "relative" }}>
            <Calendar className="icon" />
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Clock className="icon" />
            <input
              type="time"
              className="time-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={closeEdit}>
            Cancel
          </button>
          <button className="btn" onClick={handleUpdate}>
            Update Event
          </button>
        </div>
      </div>
    </div>
  );
}
