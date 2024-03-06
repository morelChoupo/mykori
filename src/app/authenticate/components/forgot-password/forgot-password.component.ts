import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import PassWordMatch from 'src/app/admin/models/Validators/password-match';
import {AuthModel} from '../../models/auth-model';
import {AuthService} from '../../services/auth/auth.service';
import {LoaderService} from "../../../shared/services/loader.service";

const strongRegex = "^.*(?=.{8,})((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    form!: FormGroup;
    formPass!: FormGroup;
    submitted: boolean = false;
    showPass: boolean = false;
    token: string = "null";

    constructor(private loader: LoaderService, private activeRoute: ActivatedRoute, private toastService: ToastrService, private fb: FormBuilder,
                private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            mail: ['', [Validators.required, Validators.email]],

        });

        this.formPass = this.fb.group({
            newPass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(strongRegex)]],
            confirmNewPass: ['', Validators.required]
        }, {
            validators: [PassWordMatch.match('newPass', 'confirmNewPass')]
        });

        this.token = this.activeRoute.snapshot.paramMap.get('token')!;


    }

    get f() {
        return this.form.controls;
    }


    get fPass() {
        return this.formPass.controls;
    }

    setVisiblePass() {
        this.showPass = !this.showPass;
    }

    pass() {
        this.submitted = true;
        if (this.formPass.valid) {

            let t = new AuthModel();
            t.token = this.token;
            t.password = this.formPass.get('newPass')?.value;
            t.confirmPassword = this.formPass.get('confirmNewPass')?.value;

            this.authService.recoveryPassword(t).subscribe({
                next: () => {

                    this.toastService.success('', 'Mot de passe modifié avec succès', {
                        timeOut: 5000,
                    })

                },
                error: (err: HttpErrorResponse) => {
                    console.error(err);

                    this.toastService.error("Une erreur a été rencontrée", '', {timeOut: 5000});
                },
                complete: () => {
                    this.submitted = false;
                    this.router.navigate(['/login']);

                }
            })
        }
    }


    forgot() {
        this.submitted = true;
        if (this.form.valid) {

            this.authService.forgotPassword(this.form.get('mail')?.value).subscribe({
                next: () => {


                    this.toastService.success('', 'Un email vous a été envoyé... ', {
                        timeOut: 5000,
                    })

                },
                error: (err: HttpErrorResponse) => {


                    console.error(err.status);
                    if (err.status === 404) {
                        this.toastService.error("Adresse mail introuvable", '', {timeOut: 5000});
                    } else {
                        this.toastService.error("Une erreur a été rencontrée", '', {timeOut: 5000});
                    }
                },
                complete: () => {
                    this.submitted = false;
                    this.router.navigate(['/login']);

                }
            })
        }
    }

}
