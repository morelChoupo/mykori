import { Role } from './enum/role';
import { StatusSubscriber } from './enum/status-subscriber';
export class User {
  id!:number;
  name!:string;
  surname!:string;
  email!:string;
  phone!:string;
  status!:StatusSubscriber;
  role!:Role;
  sessionId!:string;
}
