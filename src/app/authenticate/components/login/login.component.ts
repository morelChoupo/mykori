import { HttpErrorResponse } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

import { Login } from '../../models/login';
import { AuthService } from '../../services/auth/auth.service';
import {LoaderService} from "../../../shared/services/loader.service";
import {AbstractComponent} from "../../../shared/components/abstract-component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractComponent
  <any> implements OnInit {
  form!:FormGroup;

  showPass:boolean = false;
  returnUrl!:string;

  constructor(private loader:LoaderService,
              private cdr: ChangeDetectorRef,
              private route:ActivatedRoute,
              private toastService: ToastrService,private fb:FormBuilder, private authService:AuthService,private router:Router) {
    super();

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      login:['', [Validators.required, Validators.email]],
      password:['', Validators.required],

    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl']  || '/admin/dashboard';
  }

  get f(){
    return this.form.controls;
  }

  setVisiblePass() {
    this.showPass = !this.showPass;
  }

  login(){
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);

    this.submitted = true;
    if(this.form.valid){

      let auth = new Login();
      auth.login= this.form.get('login')?.value;
      auth.password= this.form.get('password')?.value;
      this.authService.login(auth).subscribe({
        next: it =>{
          const helper = new JwtHelperService();

          if (it && !helper.isTokenExpired(it)) {
           this.router.navigate([this.returnUrl]).then(r => console.trace(r));


          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);

          this.toastService.error("Login ou Mot de passe incorrect", '',{timeOut:5000});
        },
        complete: ()=>{
          this.toastService.success('', 'Utilisateur connecté avec succès', {
            timeOut: 5000,
         })
        }
      })
    }
  }
}
