import React from "react";
import { DateRangePickerProps } from './types/DateRangePicker';

declare module 'ims-ui-library_v1' {
  namespace imsui {
    const DateRangePicker: React.FC<DateRangePickerProps>;
  }

  export = imsui;
}