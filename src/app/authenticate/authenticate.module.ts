import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ActivateComponent } from './components/activate/activate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ActivateComponent,
    ForgotPasswordComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthenticateRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthenticateModule { }
