"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import sampleEvents from "./events";
import Popup from "../popup/PopupDialog";
import { useEffect, useState } from "react";
import PopupDialog from "../popup/PopupDialog";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import {
  CalendarEvent,
  getEventFromLocalStorage,
  saveEventToLocalStorage,
} from "@/utils/localStrage";

export default function Calendar() {
  // const [events, setEvents] = useState<any[]>(sampleEvents);
  // const [events, setEvents] = useState<any[]>(getEventFromLocalStorage());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [popup, setPopup] = useState<{
    right: string;
    left: string;
    y: string;
    date: string[];
  } | null>(null);

  function handleDateClick(info: any) {
    // get the clicked coordinates
    const popupRect = info.dayEl.getBoundingClientRect();
    const calendarRect = document
      .getElementById("Calendar")
      .getBoundingClientRect();
    if (popupRect.left < calendarRect.right / 2) {
      setPopup({
        right: "auto",
        left: popupRect.right - calendarRect.left + 5 + "px",
        y: popupRect.top - calendarRect.top + "px",
        date: [
          info.date.getFullYear().toString(),
          (info.date.getMonth() + 1).toString().padStart(2, "0"),
          info.date.getDate().toString().padStart(2, "0"),
        ],
      });
    } else {
      setPopup({
        right: calendarRect.right - popupRect.left + 5 + "px",
        left: "auto",
        y: popupRect.top - calendarRect.top + "px",
        date: [
          info.date.getFullYear().toString(),
          (info.date.getMonth() + 1).toString().padStart(2, "0"),
          info.date.getDate().toString().padStart(2, "0"),
        ],
      });
    }
  }

  const handleSaveEvent = (
    title: string,
    date: string,
    description: string | null
  ) => {
    console.log("executed: handleSaveEvent");

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title,
      date: date,
      description: description ?? undefined,
    };
    setEvents((prev) => [...prev, newEvent]);
    saveEventToLocalStorage(newEvent);
  };

  useEffect(() => {
    const storedEvents = getEventFromLocalStorage();
    setEvents(storedEvents);
    // Desplay dummy event
    setEvents((prev) => [...prev.concat(sampleEvents)]);
    console.log(events);
  }, []);

  return (
    <div className="p-4 relative">
      <FullCalendar
        headerToolbar={{
          left: "title",
          center: "dayGridDay,dayGridWeek,dayGridMonth,dayGridYear",
          right: "prev today next",
        }}
        buttonText={{
          day: "Day",
          week: "Week",
          month: "Month",
          year: "Year",
          today: "Today",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        // events="https://fullcalendar.io/api/demo-feeds/events.json"
        //events={events}
        events={events.map((e) => ({ title: e.title, start: e.date }))}
        // eventContent={renderEventContent}
        height="auto"
        dateClick={handleDateClick}
      />
      {popup && (
        <PopupDialog
          right={popup.right}
          left={popup.left}
          y={popup.y}
          date={popup.date}
          onClose={() => {
            setPopup(null);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title} </i>
    </>
  );
}
