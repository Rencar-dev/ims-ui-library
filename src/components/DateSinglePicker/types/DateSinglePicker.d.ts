import { Dayjs } from "dayjs";

export type DateSinglePickerProps = {
  date?: Date | Dayjs | string;
  onChange<T>(date: T, dateString: string): T;
  format?: string;
};
