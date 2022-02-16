import { RangeValue, EventValue } from "rc-picker/es/interface";
import dayjs, { Dayjs } from "dayjs";

export const stringDateToDayjsForArray = <T>(
  dates?: Array<T>,
  format?: string
): RangeValue<Dayjs> | any => {
  if (!dates?.every((date) => !!date)) return;

  const result = dates.map((date: T) =>
    dayjs(date as any, format || "YYYY-MM-DD")
  );
  return result;
};

export const dayjsFormatParserForArray = (
  dates?: Array<Dayjs>,
  _format?: string
): Array<string | undefined> | void => {
  if (!dates?.every((date) => !!date)) return;

  const result = dates.map((date: EventValue<Dayjs>) => {
    return date?.format(_format || "YYYY-MM-DD");
  });
  return result;
};
