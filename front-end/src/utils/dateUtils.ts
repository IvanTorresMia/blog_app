import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(date: string) {
    return dayjs.utc(date).format("MM/DD/YYYY");
}

// function to disable all days except for the first for the datepicker
export function disableCalendarDays(day: any) {
    const isTheFirst = day.$D !== 1;
    return isTheFirst;
}
