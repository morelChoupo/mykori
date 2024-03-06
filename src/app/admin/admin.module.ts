import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {NgSelectModule} from "@ng-select/ng-select";
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TransactionComponent} from "./components/transactions/transaction.component";
import {TransactionListComponent} from "./components/transactions/transactions-list/transaction-list.component";
import {BoardComponent} from "./components/board/board.component";


@NgModule({
  declarations: [
    SidebarComponent,
    TransactionComponent,
    TransactionListComponent,
    BoardComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgSelectModule,
    FormsModule
  ],

})
export class AdminModule { }
