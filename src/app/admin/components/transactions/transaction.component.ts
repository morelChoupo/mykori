import {Component, OnInit} from "@angular/core";
import {AbstractComponent} from "../../../shared/components/abstract-component";
import {ApiResponsePage} from "../../../shared/models/response/api-response-page";
import {LoaderService} from "../../../shared/services/loader.service";
import {Observable} from "rxjs";

import {ActivatedRoute} from "@angular/router";
import {Transaction} from "../../models/transaction";
import {TransactionService} from "../../services/transaction.service";


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends AbstractComponent<Transaction> implements OnInit {

  transactions$: Observable<ApiResponsePage<Transaction>>;


  constructor(private loaderService: LoaderService,
              private route: ActivatedRoute,
              private transactionService: TransactionService) {
    super();
  }

  ngOnInit(): void {
    this.page = 0;
    this.reloadTransactions();
  }


  reloadTransactions() {
    const transactions$ = this.transactionService.getTransactions(this.page, this.limit);
    this.transactions$ = this.loaderService.showLoaderUntilCompleted<ApiResponsePage<Transaction>>(transactions$);
  }

}
