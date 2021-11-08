import React, { useState, useEffect } from "react";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import korea from "antd/es/locale/ko_KR";
import ConfigProvider from 'antd/es/config-provider';
import {
  dayjsFormatParserForArray,
  stringDateToDayjsForArray,
} from "@utils/dateUtils";
import { DateRangePickerProps } from "../../../types/DateRangePicker";
import { DATE_RANGE_PICKER_ONCALENDERCHANGE_ERROR } from'@src/assets/static/stringTable/stringTable';

const DateRangePicker: React.FC<DateRangePickerProps> = (
  props: DateRangePickerProps
) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const DatePicker: any = generatePicker<Dayjs>(dayjsGenerateConfig);
  const className = props.className || "";
  const dropdownClassName = props.dropdownClassName || "";
  const defaultPopupStyle =  {pointerEvents: 'auto', display : isAvailable ? 'block' : 'none'}
  const popupStyle =   props?.popupStyle ? {...props.popupStyle, ...defaultPopupStyle } : defaultPopupStyle;; // popup Calender style
  const dateFormat = props.format || "YYYY-MM-DD";
  const locale = props.locale || korea;
  const size = props.size || "middle";
  const separator = props.separator || "~";
  const style = props.inputStyle || {};
  const value = stringDateToDayjsForArray(props.dates, dateFormat) || [];
  const mode = props.mode || "";
  const disabled = props.disabled || false;
  
  useEffect(() => {
    if(!isAvailable) setIsAvailable(true);
  })

  const onBlur = (click: any) => {
    if(!click.target.value) {
        setIsAvailable(false);
    } else {
      const [day1, day2] = dayjsFormatParserForArray(value) as Array<string|undefined>;
      if(day1 === click.target.value || day2 === click.target.value) {
        setIsAvailable(false);
      }
    } 
    props?.onBlur ? props.onBlur(click) : undefined;
  }

  const onChange = (
        dates: Array<Dayjs>,
      ): void => {
        const [day1, day2] = dates;
        const hours = dayjs(day2).diff(dayjs(day1), "hours");
        const days = Math.floor(hours / 24);
        const isReverseDates = days < 0;
        if (isReverseDates) {
          return alert("종료일자는 시작일자보다 앞설 수 없습니다.");
        }
        const _dates = dayjsFormatParserForArray(dates, dateFormat);
        setIsAvailable(false);
        if(!props?.onChange) {
          console.log(DATE_RANGE_PICKER_ONCALENDERCHANGE_ERROR);
          return;
        }
        props?.onChange(_dates);
      }

  const onOpenChange = props.onOpenChange
    ? (open: any): void => {
        props?.onOpenChange(open);
      }
    : undefined;

  const getPopupContainer: any = props?.getPopupContainer
    ? (triggerNode: any) => {
        return props.getPopupContainer(triggerNode);
      }
    : (triggerNode: any) => {
      return triggerNode.parentNode;
    };

  const _props = {
    className,
    dropdownClassName,
    dateFormat,
    locale,
    size,
    separator,
    popupStyle,
    style,
    value,
    mode,
    onChange,
    onOpenChange,
    getPopupContainer,
    disabled,
    onBlur,
  };

  return (
    <ConfigProvider locale={korea}>
      <div className="library_style_custom_wrap_for_imsui" data-style="dateRangePicker">
        <DatePicker.RangePicker {..._props} />
      </div>
    </ConfigProvider>
  );
};

export default DateRangePicker;
