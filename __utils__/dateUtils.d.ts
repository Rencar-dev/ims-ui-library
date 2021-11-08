import { RangeValue } from "rc-picker/es/interface";
import dayjs, { Dayjs } from "dayjs";
export declare const stringDateToDayjsForArray: (dates?: (string | dayjs.Dayjs)[] | undefined, format?: string | undefined) => RangeValue<Dayjs> | any;
export declare const dayjsFormatParserForArray: (dates?: RangeValue<dayjs.Dayjs> | undefined, _format?: string | undefined) => Array<string | undefined> | void;
