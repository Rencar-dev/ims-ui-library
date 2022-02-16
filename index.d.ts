import React from "react";
import { DateRangePickerProps } from "./types/DateRangePicker";
import { DateSinglePickerProps } from "./types/DateSinglePicker";

declare module "ims-ui-library_v1" {
  namespace imsui {
    const DateRangePicker: React.FC<DateRangePickerProps>;
    const DateSinlgePicker: React.FC<DateSinglePickerProps>;
  }

  export = imsui;
}
