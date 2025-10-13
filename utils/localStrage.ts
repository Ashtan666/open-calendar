// utils/localstorage.ts
const STORAGE_KEY = "open-calendar-events";

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  //endDate: string;
  description?: string;
}

// --- Save ---
export function saveEventToLocalStorage(event: CalendarEvent) {
  const existing = getEventFromLocalStorage();
  const updated = [...existing, event];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// --- Update ---

export function updateEventToLocalStorage(event: CalendarEvent) {
  const existing = getEventFromLocalStorage();
  const updated = existing.map((e) => (e.id === event.id ? event : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// --- Read ---
export function getEventFromLocalStorage(): CalendarEvent[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// --- Delete ---
export function deleteEventFromLocalStorage(id: string) {
  const existing = getEventFromLocalStorage();
  // find or filter
  const updated = existing.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// --- Clear All ---
export function clearAllEvents() {
  localStorage.removeItem(STORAGE_KEY);
}
