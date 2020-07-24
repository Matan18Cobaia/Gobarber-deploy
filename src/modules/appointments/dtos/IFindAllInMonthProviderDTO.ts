import { de } from "date-fns/locale";

export default interface IFindAllInMonthFromProviderDTO{
  provider_id: string;
  month: number;
  year:number;
}
