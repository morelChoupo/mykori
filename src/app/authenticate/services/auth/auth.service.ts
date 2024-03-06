
import {User} from '../../../admin/models/user';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Login} from '../../models/login';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthModel} from '../../models/auth-model';
import {environment} from "../../../../environments/environment";
import {shareReplay} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

const TOKEN = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentTokenBehavior!: BehaviorSubject<string>;
    public currentToken!: Observable<string>;

    constructor(private http: HttpClient,private cookieService: CookieService) {
        this.currentTokenBehavior = new BehaviorSubject(localStorage.getItem(TOKEN)!);
        this.currentToken = this.currentTokenBehavior.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        observe: 'response'
    };


    get currenTokenValue() {
        return this.currentTokenBehavior.value;
    }

    login(login: Login): Observable<any> {

        return this.http.post<User>(environment.baseUrl + "admins/auth", login, {observe: 'response'}).pipe(
            map(data => {

              console.log(data.body);

                localStorage.setItem('login', data.body!.email);
                this.cookieService.set('id', String(data.body!.id));
                localStorage.setItem('role', data.body!.role);
                localStorage.setItem('session', data.body!.sessionId);
                let token = '';
                const helper = new JwtHelperService();
                if (data.headers.has('authorization')) {

                    token = data.headers.get('authorization')!;

                    token = token.substring(7);

                    if (!helper.isTokenExpired(token)) {
                        localStorage.setItem(TOKEN, token);
                        this.currentTokenBehavior.next(token);
                    }

                }
                return token;
            })
        );
    }

    active(t: AuthModel): Observable<any> {
        return this.http.put(environment.baseUrl + "admins/active", t);
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(environment.baseUrl + "admins/forgotPassword/" + email, this.httpOptions);
    }

    recoveryPassword(t: AuthModel): Observable<any> {
        return this.http.put(environment.baseUrl + "admins/recoveryPassword", t);
    }

    logOut() {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem('login');
        localStorage.removeItem('role');
        localStorage.removeItem('session');
        this.currentTokenBehavior.next(null!);
    }


  getUser(id: string) : Observable<User>{

    return this.http.get<any>(environment.baseUrl + 'subscribers/' +id)
      .pipe(
        map(response => response['data']),
        shareReplay()
      );
  }
}
