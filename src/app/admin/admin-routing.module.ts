import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../authenticate/services/guard/auth-guard.service';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {RoleGuardService} from "../authenticate/services/guard/role-guard.service";
import {TransactionComponent} from "./components/transactions/transaction.component";
import {BoardComponent} from "./components/board/board.component";


const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'products',
        component: TransactionComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: {
          noExpectedRole: 'ROOT'
        }
      },
      {
        path: 'transactions',
        component: TransactionComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: {
          noExpectedRole: 'ROOT'
        }
      },

      {
        path: 'dashboard',
        component: BoardComponent,
        canActivate: [AuthGuardService]
      },

    ]
  },
  {
    path: '**',
    redirectTo:'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
