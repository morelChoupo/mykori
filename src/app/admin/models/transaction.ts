import {User} from "./user";


export class Transaction {

  id!: string;

  amount!: number;
  name!: string;
  reference!: string;
  payment!: string;
  subscriber!: string;
  subscriberr!: User;
  date!: string;


  createdAt!:string;
  updatedAt!:string;
  createdBy!:string;
  updatedBy!:string;
}
