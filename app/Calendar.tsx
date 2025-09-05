"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [{ title: "Meeting", start: new Date() }];
export default function Calendar() {
  return (
    <div className="p-4">
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
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventColor="red"
        // eventContent={renderEventContent}
        height="auto"
      />
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
