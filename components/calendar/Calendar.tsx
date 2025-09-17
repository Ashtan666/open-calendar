"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import events from "./events";
import Popup from "../popup/PopupDialog";
import { useState } from "react";
import PopupDialog from "../popup/PopupDialog";

export default function Calendar() {
  const [popup, setPopup] = useState<{
    right: string;
    left: string;
    y: string;
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
      });
    } else {
      setPopup({
        right: calendarRect.right - popupRect.left + 5 + "px",
        left: "auto",
        y: popupRect.top - calendarRect.top + "px",
      });
    }
  }

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
        events={events}
        // eventContent={renderEventContent}
        height="auto"
        dateClick={handleDateClick}
      />
      {popup && (
        <PopupDialog
          right={popup.right}
          left={popup.left}
          y={popup.y}
          onClose={() => {
            setPopup(null);
          }}
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
