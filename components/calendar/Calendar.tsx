"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import sampleEvents from "./events";
import { useEffect, useState } from "react";
import PopupDialog from "../popup/PopupDialog";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import {
  CalendarEvent,
  getEventFromLocalStorage,
  saveEventToLocalStorage,
  updateEventToLocalStorage,
} from "@/utils/localStrage";

export default function Calendar() {
  // const [events, setEvents] = useState<any[]>(sampleEvents);
  // const [events, setEvents] = useState<any[]>(getEventFromLocalStorage());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [popup, setPopup] = useState<{
    right: string;
    left: string;
    y: string;
    startDate: string;
    event?: CalendarEvent;
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
        startDate: info.date.toLocaleDateString("sv-SE"),
      });
    } else {
      setPopup({
        right: calendarRect.right - popupRect.left + 5 + "px",
        left: "auto",
        y: popupRect.top - calendarRect.top + "px",
        startDate: info.date.toLocaleDateString("sv-SE"),
      });
    }
  }

  function handleEventClick(info: any) {
    // set display position
    const popupRect = info.el.getBoundingClientRect();
    const calendarRect = document
      .getElementById("Calendar")
      .getBoundingClientRect();

    console.log(info.event);

    if (popupRect.left < calendarRect.right / 2) {
      setPopup({
        right: "auto",
        left: popupRect.right - calendarRect.left + 5 + "px",
        y: popupRect.top - calendarRect.top + "px",
        startDate: info.event.start.toLocaleDateString("sv-SE"),
        event: {
          id: info.event.id,
          title: info.event.title,
          startDate: info.event.start.toLocaleDateString("sv-SE"),
          description: info.event.extendedProps.description,
        },
      });
    } else {
      setPopup({
        right: calendarRect.right - popupRect.left + 5 + "px",
        left: "auto",
        y: popupRect.top - calendarRect.top + "px",
        startDate: info.event.start.toLocaleDateString("sv-SE"),
        event: {
          id: info.event.id,
          title: info.event.title,
          startDate: info.event.start.toLocaleDateString("sv-SE"),
          description: info.event.extendedProps.description,
        },
      });
    }
  }

  const handleSaveEvent = (
    title: string,
    startDate: string,
    description?: string,
    id?: string
  ) => {
    console.log("executing: handleSaveEvent");
    if (id) {
      // Edit
      const updatedEvent: CalendarEvent = { id, title, startDate, description };
      setEvents((prev) => prev.map((e) => (e.id === id ? updatedEvent : e)));
      updateEventToLocalStorage(updatedEvent);
    } else {
      // Create new
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: title,
        startDate: startDate,
        description: description ?? undefined,
      };
      setEvents((prev) => [...prev, newEvent]);
      saveEventToLocalStorage(newEvent);
    }
  };

  useEffect(() => {
    const storedEvents = getEventFromLocalStorage();
    setEvents(storedEvents);
    // Desplay dummy event
    setEvents((prev) => [...prev.concat(sampleEvents)]);
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
        events={events.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.startDate,
          description: e.description,
        }))}
        // eventContent={renderEventContent}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {popup && (
        <PopupDialog
          right={popup.right}
          left={popup.left}
          y={popup.y}
          startDate={popup.startDate}
          event={popup.event}
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
