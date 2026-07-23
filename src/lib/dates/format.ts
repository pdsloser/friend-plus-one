import { formatInTimeZone } from "date-fns-tz";
import { zhTW } from "date-fns/locale/zh-TW";

const taipeiTimeZone = "Asia/Taipei";

export function formatTaipeiDateTime(value: string) {
  return formatInTimeZone(value, taipeiTimeZone, "yyyy年M月d日 EEEE HH:mm", { locale: zhTW });
}

export function formatTaipeiMonthDay(value: string) {
  return formatInTimeZone(value, taipeiTimeZone, "M月d日 EEEE", { locale: zhTW });
}
