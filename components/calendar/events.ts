import { CalendarEvent } from "@/utils/localStrage";

// create sample event
const today = new Date();

const date = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
};

// const events= [
//   {
//     title: "Event1",
//     start: new Date(),
//     color: "green", // override!
//   },
//   {
//     title: "Event2",
//     start: new Date(),
//     color: "green", // override!
//   },
//   {
//     title: "Event3",
//     start: new Date(date.year, date.month - 1, date.day + 3),
//   },
//   {
//     title: "Weekly Event",
//     start: new Date(date.year, date.month - 1, date.day),
//     end: new Date(date.year, date.month - 1, date.day + 6),
//   },
// ];

/*-------------------------*/
// id: string;
// title: string;
// date: string;
// description?: string;
/*-------------------------*/
const events: CalendarEvent[] = [
  {
    id: crypto.randomUUID(),
    title: "Sample1",
    // date: new Date().toString(),
    // date: "2025-10-07",
    // sv-SE locale returns a date stirng in the format YYYY-MM-DD
    startDate: new Date().toLocaleDateString("sv-SE"),
    description: "Description of Sample1",
  },
  {
    id: crypto.randomUUID(),
    title: "Sample2",
    // date: new Date().toString(),
    // date: "2025-10-07",
    // sv-SE locale returns a date stirng in the format YYYY-MM-DD
    startDate: new Date(
      date.year,
      date.month - 1,
      date.day + 3
    ).toLocaleDateString("sv-SE"),
    description: "Description of Sample1",
  },
];

export default events;
