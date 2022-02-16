import { Dayjs } from "dayjs";
import { CSSProperties } from "react";

export type DateSinglePickerProps = {
  selectedDate?: Date | Dayjs | string;
  onChange(date: string, dateString?: string): void;
  format?: string;
  style?: CSSProperties;
};
