
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {ActivateComponent} from "./components/activate/activate.component";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";



const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'active/:token',
        component: ActivateComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'password-forgot',
        component: ForgotPasswordComponent,
      },
      {
        path: 'recovery-pass/:token',
        component: ForgotPasswordComponent,
      },
      {
        path: '**',
        redirectTo:'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticateRoutingModule { }
