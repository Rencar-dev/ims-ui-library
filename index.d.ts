import { DateSinglePickerProps } from "./types/DateSinglePicker";
import React from "react";
import { DateRangePickerProps } from "./types/DateRangePicker";

declare module "ims-ui-library_v1" {
  namespace imsui {
    const DateRangePicker: React.FC<DateRangePickerProps>;
    const DateSinglePicker: React.FC<DateSinglePickerProps>;
  }

  export = imsui;
}
