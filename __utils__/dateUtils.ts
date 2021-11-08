import { RangeValue, EventValue } from "rc-picker/es/interface";
import dayjs, { Dayjs } from "dayjs";

export const stringDateToDayjsForArray = (
  dates?: Array<string | Dayjs>,
  format?: string
): RangeValue<Dayjs> | any => {
  if (!dates?.every((date) => !!date)) return;

  const result = dates.map((date: string | Dayjs) => 
    dayjs(date, format || "YYYY-MM-DD")
  );
  return result;
};

export const dayjsFormatParserForArray = (
  dates?: Array<Dayjs>,
  _format?: string
): Array<string | undefined> | void => {
  if (!dates?.every((date) => !!date)) return;
  
  const result = dates.map((date: EventValue<Dayjs>) =>
    date?.format(_format || "YYYY-MM-DD")
  );
  return result;
};
