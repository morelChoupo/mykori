import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {Observable,noop} from "rxjs";

import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";


import {ApiResponsePage} from "../../../../shared/models/response/api-response-page";
import {AbstractComponent} from "../../../../shared/components/abstract-component";
import {LoaderService} from "../../../../shared/services/loader.service";
import {TransactionService} from "../../../services/transaction.service";
import {Transaction} from "../../../models/transaction";
import {AuthService} from "../../../../authenticate/services/auth/auth.service";


declare var $ : any;


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent
  extends AbstractComponent<Transaction>
  implements OnInit {



  transaction$: Observable<Transaction>;

  @Input()
  datas: Observable<ApiResponsePage<Transaction>>;



  name: string = "";
  email: string = "";
  code: string = "";


  @Output()
  private transactionsChanged = new EventEmitter();




  constructor(
    private authService:AuthService,
    private toast: ToastrService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private transactionService: TransactionService,
  ) {
    super();
    const loadingSubscr = this.isLoading$.asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.user$ = this.authService.getUser(this.cookieService.get('id'));

  }

  ngOnInit(): void {

    this.user$.subscribe(res => {
      this.id = String(res!.id);
    });
    this.transactions = Object.keys(this.transactionssEnum);

  }

  override onPageChange(current: number) {
    this.datas = this.transactionService.getTransactionsByUser(this.id,current-1, this.limit);

  }


  override showDetails(val: any) {
    this.transaction$ = this.transactionService.getTransaction(this.id);
    $('#transactionsMod').modal('show');
  }





}
