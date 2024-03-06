import {Details} from "./details";

export class ApiResponsePage<T> {
  success!: boolean;
  details!: Details;
  total!:number;
  totalElements!:number;
  data!:T[];
  datas!:T[];
  content!:T[];
  meta_data!:any;
}
