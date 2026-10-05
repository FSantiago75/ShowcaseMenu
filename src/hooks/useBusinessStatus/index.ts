import { useEffect, useState } from "react";
import {
  BUSINESS_HOURS,
  BUSINESS_TIME_ZONE,
  STATUS_LABELS,
  STATUS_WINDOW_MINUTES,
  WEEKDAYS,
  type BusinessStatus,
  type BusinessStatusName,
} from "../../config/business-hours";

function getSaoPauloTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(values.weekday);
  return { weekdayIndex, minutes: Number(values.hour) * 60 + Number(values.minute) };
}

function formatTime(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function getNextOpening(weekdayIndex: number, minutes: number) {
  for (let offset = 0; offset < 7; offset += 1) {
    const dayIndex = (weekdayIndex + offset) % 7;
    const hours = BUSINESS_HOURS[dayIndex];
    if (hours && (offset > 0 || minutes < hours.open)) {
      const day = offset === 0 ? "hoje" : offset === 1 ? "amanhã" : WEEKDAYS[dayIndex];
      return `Abre ${day} às ${formatTime(hours.open)}`;
    }
  }
  return "Consulte o funcionamento";
}

function createStatus(state: BusinessStatusName, detail: string): BusinessStatus {
  return { state, label: STATUS_LABELS[state], detail };
}

function calculateStatus(): BusinessStatus {
  const { weekdayIndex, minutes } = getSaoPauloTime();
  const hours = BUSINESS_HOURS[weekdayIndex];

  if (!hours) return createStatus("closed", getNextOpening(weekdayIndex, minutes));
  if (minutes >= hours.open - STATUS_WINDOW_MINUTES && minutes < hours.open) {
    return createStatus("opening", `Abre às ${formatTime(hours.open)}`);
  }
  if (minutes >= hours.open && minutes < hours.close - STATUS_WINDOW_MINUTES) {
    return createStatus("open", `Fecha às ${formatTime(hours.close)}`);
  }
  if (minutes >= hours.close - STATUS_WINDOW_MINUTES && minutes < hours.close) {
    return createStatus("closing", `Fecha às ${formatTime(hours.close)}`);
  }
  return createStatus("closed", getNextOpening(weekdayIndex, minutes));
}

export function useBusinessStatus() {
  const [status, setStatus] = useState(calculateStatus);
  useEffect(() => {
    const interval = window.setInterval(() => setStatus(calculateStatus()), 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return status;
}
