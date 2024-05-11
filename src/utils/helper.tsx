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

// Conversion from localtime to UTC

export { getLocalTime, tzconversion };
