import React from "react";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import korea from "antd/es/locale/ko_KR";
import ConfigProvider from "antd/es/config-provider";
import {
  dayjsFormatParserForArray,
  stringDateToDayjsForArray,
} from "@utils/dateUtils";
import { DateRangePickerProps } from "./types/DateRangePicker";
import { DATE_RANGE_PICKER_ONCALENDERCHANGE_ERROR } from "@src/assets/static/stringTable/stringTable";

const DateRangePicker: React.FC<DateRangePickerProps> = (
  props: DateRangePickerProps
) => {
  const DatePicker: any = generatePicker<Dayjs>(dayjsGenerateConfig);
  const className = props.className || "";
  const dropdownClassName = props.dropdownClassName || "";
  const popupStyle = props?.popupStyle; // popup Calender style
  const dateFormat = props.format || "YYYY-MM-DD";
  const locale = props.locale || korea;
  const size = props.size || "middle";
  const separator = props.separator || "~";
  const style = props.inputStyle || {};
  const value = stringDateToDayjsForArray(props.dates, dateFormat) || [];
  const mode = props.mode || "";
  const disabled = props.disabled || false;
  let FocusBlurTarget: any = {
    focusPlaceholder: "",
    blurPlaceholder: "",
    focusValue: "",
    blurValue: "",
  };

  const isEqualWithBeforeValue = (before: any, current: any) => {
    const [beforeDay1, beforeDay2] = before;
    const [currentDay1, currentDay2] = current;

    return beforeDay1 !== currentDay1 && beforeDay2 !== currentDay2;
  };

  const onChange = (dates: Array<Dayjs>): void => {
    const [day1, day2] = dates;
    const hours = dayjs(day2).diff(dayjs(day1), "hours");
    const days = Math.floor(hours / 24);
    const isReverseDates = days < 0;
    if (isReverseDates) {
      return alert("종료일자는 시작일자보다 앞설 수 없습니다.");
    }

    if (!props?.onChange) {
      console.log(DATE_RANGE_PICKER_ONCALENDERCHANGE_ERROR);
      return;
    }

    const beforeValue = dayjsFormatParserForArray(value, dateFormat);
    const currentValue = dayjsFormatParserForArray(dates, dateFormat);
    if (!isEqualWithBeforeValue(beforeValue, currentValue)) return;

    FocusBlurTarget = {
      focusPlaceholder: "",
      blurPlaceholder: "",
      focusValue: "",
      blurValue: "",
    };
    props?.onChange(currentValue);
  };

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

  const onFocus = props.onFocus
    ? props.onFocus
    : (event: any) => {
        if (
          !!FocusBlurTarget.focusPlaceholder &&
          !!FocusBlurTarget.blurPlaceholder
        ) {
          if (
            FocusBlurTarget.focusPlaceholder === FocusBlurTarget.blurPlaceholder
          ) {
            if (FocusBlurTarget.focusValue === FocusBlurTarget.blurValue) {
              FocusBlurTarget = {
                focusPlaceholder: "",
                blurPlaceholder: "",
                focusValue: "",
                blurValue: "",
              };
              return;
            }
          }
        }
        FocusBlurTarget.blurPlaceholder = FocusBlurTarget.focusPlaceholder;
        FocusBlurTarget.focusPlaceholder = event.target.placeholder;
        FocusBlurTarget.focusValue = event.target.value;
      };

  const onBlur = props.onBlur
    ? props.onBlur
    : (event: any) => {
        let _dates = Array.isArray(props.dates) ? [...props.dates] : [];
        if (
          !!FocusBlurTarget.focusPlaceholder &&
          !!FocusBlurTarget.blurPlaceholder
        ) {
          if (
            FocusBlurTarget.focusPlaceholder !== FocusBlurTarget.blurPlaceholder
          ) {
            if (FocusBlurTarget.blurPlaceholder === "시작일") {
              _dates[0] = dayjs(FocusBlurTarget.blurValue);
            }
            if (FocusBlurTarget.blurPlaceholder === "종료일") {
              _dates[1] = dayjs(FocusBlurTarget.blurValue);
            }
            _dates = _dates.map((date) => dayjs(date).format(dateFormat));
            if (_dates.some((date) => date === "Invalid Date")) {
              _dates = Array.isArray(props.dates) ? [...props.dates] : [];
              _dates = _dates.map((date) => dayjs(date).format(dateFormat));
              return;
            }
            FocusBlurTarget = {
              focusPlaceholder: "",
              blurPlaceholder: "",
              focusValue: "",
              blurValue: "",
            };
            props.onChange(_dates);
          }
        }
        FocusBlurTarget.blurPlaceholder = event.target.placeholder;
        FocusBlurTarget.blurValue = event.target.value;
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
    onFocus,
    onBlur,
  };

  return (
    <ConfigProvider locale={korea}>
      <DatePicker.RangePicker {..._props} />
    </ConfigProvider>
  );
};

export default DateRangePicker;
