export class ApiResponse<T> {
  success!: boolean;
  data!: T;
  response!: T;
  total!: number;
  error!: any;
  status!: string;
  code!: number;
  message!: string;
}
