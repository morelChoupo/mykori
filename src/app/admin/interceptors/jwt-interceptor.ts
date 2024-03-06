import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authenticate/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  helper = new JwtHelperService();

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.currenTokenValue;
      const isExpired = this.helper.isTokenExpired(token);
      if (token && !isExpired) {
        
          const cloned = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + token)
          });

          return next.handle(cloned);
      }

      return next.handle(req);
  }

}
