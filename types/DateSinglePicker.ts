import { Dayjs } from "dayjs";

export type DateSinglePickerProps = {
  selectedDate?: Date | Dayjs | string;
  onChange(date: string, dateString?: string): void;
  format?: string;
};
