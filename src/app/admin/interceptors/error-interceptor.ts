import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpErrorResponse,  HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/authenticate/services/auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.includes('/admins/auth')) {
          return next.handle(req);
      }
      return next.handle(req).pipe(
          catchError((err:HttpErrorResponse) => {
              if (err.status === 403) {
                  this.auth.logOut();
                  location.reload();
                  const error = err.error.message || err.statusText;
                  return throwError(() => new Error(error));
              } else {
                  console.error(err);
                  return throwError(() => err);
              }
          })
      );
  }
}
