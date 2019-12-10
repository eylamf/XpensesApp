// @flow

// Date.prototype.daysInMonth = function() {
//   const d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
//   return d.getDate();
// };

export function daysInMonth(month?: number, year?: number): number {
  const now = new Date();

  if (month === undefined) {
    month = now.getMonth();
  }

  if (year === undefined) {
    year = now.getFullYear();
  }

  return new Date(year, month + 1, 0).getDate();
}

// Taken from StackOverflow: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366/8619946
export function getDayInYear(d?: Date): number {
  const now = d || new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  return day;
}
