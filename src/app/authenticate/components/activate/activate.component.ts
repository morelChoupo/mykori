import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PassWordMatch from 'src/app/admin/models/Validators/password-match';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AuthModel } from '../../models/auth-model';

import { HttpErrorResponse } from '@angular/common/http';
import {LoaderService} from "../../../shared/services/loader.service";

const strongRegex = "^.*(?=.{8,})((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*";


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  form!:FormGroup;
  submitted:boolean = false;
  showPass:boolean = false;
  token!:string;
  constructor(private loader:LoaderService, private activeRoute:ActivatedRoute,private toastService: ToastrService,private fb:FormBuilder, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      newPass:['', [Validators.required, Validators.minLength(8),Validators.maxLength(12), Validators.pattern(strongRegex)]],
      confirmNewPass:['', Validators.required]
    },{
      validators: [PassWordMatch.match('newPass', 'confirmNewPass')]
    });

    this.token = this.activeRoute.snapshot.paramMap.get('token')!;

  }

  get f(){
    return this.form.controls;
    }

  setVisiblePass() {
    this.showPass = !this.showPass;
  }

  active(){
    this.submitted = true;
    if(this.form.valid){

      let t = new AuthModel();
      t.token = this.token;
      t.password=this.form.get('newPass')?.value;
      t.confirmPassword= this.form.get('confirmNewPass')?.value;

      this.authService.active(t).subscribe({
        next: () =>{

          this.toastService.success('', 'Compte activé avec succès', {
               timeOut: 5000,
            })

        },
        error:  (err: HttpErrorResponse) => {
          console.error(err);

          this.toastService.error("Une erreur a été rencontrée", '',{timeOut:5000});
        },
        complete: () => {
          this.router.navigate(['/login']).then(r => console.trace(r));
        }
      })
    }
  }
}
