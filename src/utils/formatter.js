import format from "date-fns/format";

/**
 * Returns the date formated like this: YYYY-MM-DD
 * @param {Date} date Date to format
 */
const shortFormatDate = date => format(date, "YYYY-MM-DD");

const longFormatDate = date => format(date, "dddd Do MMMM");

const textFormatDate = date => format(date, "ddd D MMM");

export { shortFormatDate, longFormatDate, textFormatDate };
