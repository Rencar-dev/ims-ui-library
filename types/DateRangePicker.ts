import type { Dayjs } from "dayjs";
import type { CSSProperties } from "react";

export type DateRangePickerProps = {
  className?: string;
  dropdownClassName?: string;
  format?: string;
  locale?: any;
  size?: "large" | "middle" | "small";
  separator?: string;
  popupStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  dates?: Array<Dayjs | string>;
  mode?: "time" | "date" | "month" | "year" | "decade";
  isSetGlobalModule ?: boolean;
  onChange: (_dates: void | (string | undefined)[]) => void;
  onOpenChange: (open: any) => void;
  getPopupContainer: (trigger: any) => void;
  disabled?: boolean;
  onBlur?: (click:any) => void;
  onFocus?: (click: any) => void;
};
