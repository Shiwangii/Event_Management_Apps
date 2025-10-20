import dayjs from "dayjs";
import { create } from "zustand";

export const useApp = create((set, get) => ({
  // === STATES ===
  profiles: [],
  events: [],
  logs: [],

  // ✅ Timezone management (auto-detect user’s timezone)
  timezones: [
    "Asia/Calcutta",
    "America/New_York",
    "Europe/London",
    "Australia/Sydney",
    "UTC",
  ],
  selectedTz: Intl.DateTimeFormat().resolvedOptions().timeZone, // ✅ auto-detect system timezone

  currentProfileId: null,
  editingEvent: null,
  viewingLogs: null,

  // === ACTIONS ===
  addProfile: (name) => {
    const newProfile = { _id: Date.now().toString(), name };
    set((state) => ({
      profiles: [...state.profiles, newProfile],
    }));
  },

  createEvent: (data) => {
    const newEvent = {
      _id: Date.now().toString(),
      profiles: data.profiles,
      timezone: data.timezone,
      start: data.start,
      end: data.end,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    };

    set((state) => ({
      events: [...state.events, newEvent],
      logs: [
        ...state.logs,
        {
          eventId: newEvent._id,
          message: "Event created",
          timestamp: dayjs().toISOString(),
        },
      ],
    }));
  },

  updateEvent: (id, updates) => {
    set((state) => {
      const updatedEvents = state.events.map((e) =>
        e._id === id
          ? { ...e, ...updates, updatedAt: dayjs().toISOString() }
          : e
      );

      return {
        events: updatedEvents,
        logs: [
          ...state.logs,
          {
            eventId: id,
            message: "Event updated",
            timestamp: dayjs().toISOString(),
          },
        ],
      };
    });
  },

  // === TIMEZONE HANDLER ===
  setSelectedTz: (tz) => set({ selectedTz: tz }),

  // === PROFILE HANDLER ===
  setCurrentProfileId: (id) => set({ currentProfileId: id }),

  // === MODAL HANDLERS ===
  openEdit: (event) => set({ editingEvent: event }),
  closeEdit: () => set({ editingEvent: null }),

  openLogs: (event) => set({ viewingLogs: event }),
  closeLogs: () => set({ viewingLogs: null }),

  // === INITIAL LOAD FUNCTION (optional for syncing data)
  loadAll: () => {
    const { profiles, events, logs } = get();
    console.log("Loaded data:", { profiles, events, logs });
  },
}));
