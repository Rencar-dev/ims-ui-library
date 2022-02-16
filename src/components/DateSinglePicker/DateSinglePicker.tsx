import React, { ReactElement } from "react";
import ConfigProvider from "antd/es/config-provider";
import korea from "antd/es/locale/ko_KR";
import generatePicker from "antd/es/date-picker/generatePicker";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import { Dayjs } from "dayjs";
import { DateSinglePickerProps } from "./types/DateSinglePicker";

const DateSinglePicker = function (props: DateSinglePickerProps): ReactElement {
  const { date, format } = props;
  const DatePicker: any = generatePicker<Dayjs>(dayjsGenerateConfig);

  const onChange = (date: Dayjs, dateString: string) => {
    const _date = date.format(format || "YYYY-MM-DD");
    if (!props.onChange) {
      return console.error(
        "DateSinglePicker에 onChange를 할당하여야 기능이 동작합니다."
      );
    }
    props.onChange(_date, dateString);
  };

  const DatePickerProps = {
    date,
    onChange,
  };
  return (
    <ConfigProvider locale={korea}>
      <DatePicker {...DatePickerProps} />
    </ConfigProvider>
  );
};

export default DateSinglePicker;
