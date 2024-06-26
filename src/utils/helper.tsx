import moment from "moment-timezone";
import dayjs from "dayjs";

function getLocalTime(format: any) {
  if (format === "YYYY-MM-DD HH:mm:ss") {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  } else if (format === "dayjs") {
    return dayjs();
  } else if (format === "ISO") {
    return moment().toISOString(); // Z at the end indicates UTC time
  }
}

// Conversion from UTC to local time
function tzconversion(utcTimeString: any) {
  // Get client timezone
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Parse the UTC time string by explicitly setting the timezone to UTC
  const timeInUTC = moment.utc(utcTimeString);

  // Convert to Shanghai time
  const timeInShanghai = timeInUTC
    .tz(clientTimezone)
    .format("YYYY-MM-DD HH:mm:ss");
  // .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(China Standard Time)]");

  return timeInShanghai;
}

// "2024-05-12 12:00:00" -> "2024-05-12 12:00 PM"
const getDateHourAmPm = (dateStr: any) => {
  const date = new Date(dateStr);
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", "");
};
export { getLocalTime, tzconversion, getDateHourAmPm };
