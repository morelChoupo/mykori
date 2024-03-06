import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {Status, TransactionStatus} from '../models/misc/status';
import { ApiResponsePage } from '../models/response/api-response-page';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../admin/models/user";

export abstract class AbstractComponent<T> {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading!: unknown;
  unsubscribe: Subscription[] = [];
  page = 0;
  limit = 25;
  submitted: boolean = false;
  addForm!: FormGroup;
  editForm!: FormGroup;
  sizeDebt = 10;
  data!: Observable<ApiResponsePage<T>>;
  user$: Observable<User>;

  user!: User;
  status = Status;
  transactionStatus = TransactionStatus;
  mode:string = "CREATE";
  id:string;

  transactionssEnum = TransactionStatus;
  transactions!: string[];

  get addFormControls() {
    return this.addForm.controls;
  }

  get editFormControls() {
    return this.editForm.controls;
  }

  add() {
    throw new Error('Method not implemented.');
  }

  edit(id: string) {
    throw new Error('Method not implemented.');
  }

  activateOrDeactivate(item: any) {
    throw new Error('Method not implemented.');
  }

  delete(id: string) {
    throw new Error('Method not implemented.');
  }

  openModal(content: any) {
    throw new Error('Method not implemented.');
  }

  openEditModal(content: any, item: any) {
    throw new Error('Method not implemented.');
  }

  hideModal() {
    throw new Error('Method not implemented.');
  }

  export(): void {
    throw new Error('Method not implemented.');
  }

  showDetails(item: any): void {
    throw new Error('Method not implemented.');
  }
  showReport(item: any): void {
    throw new Error('Method not implemented.');
  }

  showVeriff(item: any): void {
    throw new Error('Method not implemented.');
  }

  showFilleuil(item: any): void {
    throw new Error('Method not implemented.');
  }


  onPageChange(current: number) {
    throw new Error('Method not implemented.');
  }

  getAll() {
    throw new Error('Method not implemented.');
  }


}
