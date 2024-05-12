import React from "react";
import moment from "moment-timezone";

export default function Clock() {
  const [timeZone, setTimeZone] = React.useState("UTC");
  const [timeZoneTime, setTimeZoneTime] = React.useState("");

  React.useEffect(() => {
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(defaultTimezone);
    setTimeZoneTime(moment().tz(defaultTimezone).format("YYYY-MM-DD HH:mm:ss"));
    const interval = setInterval(() => {
      setTimeZoneTime(
        moment().tz(defaultTimezone).format("YYYY-MM-DD HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main>
      {timeZone} {timeZoneTime}
    </main>
  );
}
