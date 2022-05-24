import type { Dayjs } from "dayjs";
import type { CSSProperties } from "react";

export type DateSinglePickerProps = {
  selectedDate?: Date | Dayjs | string;
  onChange(date: string, dateString?: string): void;
  format?: string;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (date: Dayjs) => boolean;
};
