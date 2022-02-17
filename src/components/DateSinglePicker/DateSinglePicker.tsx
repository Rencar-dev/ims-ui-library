import React, { ReactElement } from "react";
import generatePicker from "antd/es/date-picker/generatePicker";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateSinglePickerProps } from "../../../types/DateSinglePicker";
import "dayjs/locale/ko";
import korea from "antd/es/locale/ko_KR";
import ConfigProvider from "antd/es/config-provider";

const DateSinglePicker = function (props: DateSinglePickerProps): ReactElement {
  const { selectedDate, format, style } = props;
  const DatePicker: any = generatePicker<Dayjs>(dayjsGenerateConfig);
  const value = selectedDate ? dayjs(selectedDate) : "";

  const onChange = (date: Dayjs, dateString: string) => {
    const _date = dayjs(date).format(format || "YYYY-MM-DD");
    if (!props.onChange) {
      return console.error(
        "DateSinglePicker에 onChange를 할당하여야 기능이 동작합니다."
      );
    }
    props.onChange(_date, dateString);
  };

  const DatePickerProps = {
    value,
    onChange,
    style,
  };
  return (
    <ConfigProvider locale={korea}>
      <DatePicker {...DatePickerProps} />
    </ConfigProvider>
  );
};

export default DateSinglePicker;
