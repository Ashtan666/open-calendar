// create sample event
const today = new Date();

const date = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
};

const events = [
  {
    title: "Event1",
    start: new Date(),
    color: "green", // override!
  },
  {
    title: "Event2",
    start: new Date(),
    color: "green", // override!
  },
  {
    title: "Event3",
    start: new Date(date.year, date.month - 1, date.day + 3),
  },
  {
    title: "Weekly Event",
    start: new Date(date.year, date.month - 1, date.day),
    end: new Date(date.year, date.month - 1, date.day + 6),
  },
];

export default events;
