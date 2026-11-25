import React, { useEffect, useRef, useState } from "react";
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
import { DateRangePickerProps } from "../../../types/DateRangePicker";
import { DATE_RANGE_PICKER_ONCALENDERCHANGE_ERROR } from "@src/assets/static/stringTable/stringTable";

// 렌더마다 만들면 컴포넌트 타입이 매번 바뀌어 부모가 다시 그려질 때마다 달력이 재마운트된다(열림·포커스 상태 유실)
const DatePicker: any = generatePicker<Dayjs>(dayjsGenerateConfig);

const EMPTY_FOCUS_BLUR_TARGET = { focusPlaceholder: "", blurPlaceholder: "", focusValue: "", blurValue: "" };

let pickerSeq = 0;

const DateRangePicker: React.FC<DateRangePickerProps> = (
  props: DateRangePickerProps
) => {
  // 인스턴스마다 입력 영역·달력 팝업을 찾을 고유 클래스
  const uidRef = useRef<string>("");
  if (!uidRef.current) {
    pickerSeq += 1;
    uidRef.current = `ims-range-picker-${pickerSeq}`;
  }
  const uid = uidRef.current;
  const [open, setOpen] = useState(false);

  const className = `${props.className || ""} ${uid}`.trim();
  const dropdownClassName = `${props.dropdownClassName || ""} ${uid}-dropdown`.trim();
  const popupStyle = props?.popupStyle // popup Calender style
  const dateFormat = props.format || "YYYY-MM-DD";
  const locale = props.locale || korea;
  const size = props.size || "middle";
  const separator = props.separator || "~";
  const style = props.inputStyle || {};
  const value = stringDateToDayjsForArray(props.dates, dateFormat) || [];
  const mode = props.mode || "";
  const disabled = props.disabled || false;
  // 렌더마다 초기화되지 않도록 ref에 둔다
  const focusBlurRef = useRef<any>({ ...EMPTY_FOCUS_BLUR_TARGET });

  const isEqualWithBeforeValue = (before: any, current :any) => {
    const [beforeDay1, beforeDay2] = before;
    const [currentDay1, currentDay2] = current;

    // return beforeDay1 !== currentDay1 && beforeDay2 !== currentDay2
    return beforeDay1 !== currentDay1 || beforeDay2 !== currentDay2
  }

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
    if(!isEqualWithBeforeValue(beforeValue, currentValue)) return; 

    focusBlurRef.current = { ...EMPTY_FOCUS_BLUR_TARGET };
    props?.onChange(currentValue);
  };

  // 열림 상태를 직접 관리한다. antd 내부 판정(window mousedown)만으로는
  // Windows 트랙패드 탭 등에서 바깥 클릭이 감지되지 않아 달력이 닫히지 않는 경우가 있다
  const onOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen);
    props?.onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!open) return undefined;

    const closeIfOutside = (event: Event) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      if (target.closest(`.${uid}`) || target.closest(`.${uid}-dropdown`)) return;
      onOpenChange(false);
    };

    // pointerdown은 마우스·트랙패드·터치·펜을 모두 받는다. 미지원 브라우저 대비 mousedown도 함께 둔다
    document.addEventListener("pointerdown", closeIfOutside, true);
    document.addEventListener("mousedown", closeIfOutside, true);

    return () => {
      document.removeEventListener("pointerdown", closeIfOutside, true);
      document.removeEventListener("mousedown", closeIfOutside, true);
    };
  }, [open]);

  const getPopupContainer: any = props?.getPopupContainer
    ? (triggerNode: any) => {
        return props.getPopupContainer(triggerNode);
      }
    : (triggerNode: any) => {
        return triggerNode.parentNode;
      };

  const onFocus = props.onFocus ? props.onFocus : ( event: any ) => {
    if(!!focusBlurRef.current.focusPlaceholder && !!focusBlurRef.current.blurPlaceholder) {
      if(focusBlurRef.current.focusPlaceholder === focusBlurRef.current.blurPlaceholder) {
        if(focusBlurRef.current.focusValue === focusBlurRef.current.blurValue) {
          focusBlurRef.current = {focusPlaceholder: '' , blurPlaceholder: '', focusValue: '', blurValue: ''};
          return;
        }
    }
  }
    focusBlurRef.current.blurPlaceholder = focusBlurRef.current.focusPlaceholder;
    focusBlurRef.current.focusPlaceholder = event.target.placeholder;
    focusBlurRef.current.focusValue = event.target.value;
  }

  const onBlur = props.onBlur ? props.onBlur : ( event: any ) => {
    let _dates = Array.isArray(props.dates) ?  [...props.dates] : [];
    if(!!focusBlurRef.current.focusPlaceholder && !!focusBlurRef.current.blurPlaceholder) {
      if(focusBlurRef.current.focusPlaceholder !== focusBlurRef.current.blurPlaceholder) {
        if(focusBlurRef.current.blurPlaceholder === '시작일') {
          _dates[0] = dayjs(focusBlurRef.current.blurValue);
        }
        if(focusBlurRef.current.blurPlaceholder === '종료일') {
          _dates[1] = dayjs(focusBlurRef.current.blurValue);
        }
        _dates = _dates.map(date => dayjs(date).format(dateFormat))
        if(_dates.some(date=> date === 'Invalid Date')) {
          _dates = Array.isArray(props.dates) ?  [...props.dates] : [];
          _dates = _dates.map(date => dayjs(date).format(dateFormat));
          return;
        }
        focusBlurRef.current = {focusPlaceholder: '' , blurPlaceholder: '', focusValue: '', blurValue: ''};
        
        props.onChange(_dates)
      }
    }
    focusBlurRef.current.blurPlaceholder = event.target.placeholder;
    focusBlurRef.current.blurValue = event.target.value;
  }

  

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
    open,
    onOpenChange,
    getPopupContainer,
    disabled,
    onFocus,
    onBlur,
    disabledDate:props?.disabledDate
  };

  return (
    <ConfigProvider locale={korea}>
      <DatePicker.RangePicker {..._props} />
    </ConfigProvider>
  );
};

export default DateRangePicker;
