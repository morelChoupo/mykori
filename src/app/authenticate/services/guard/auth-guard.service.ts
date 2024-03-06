import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    helper = new JwtHelperService();

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(_route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean {
        const token = this.authService.currenTokenValue;

        if (token && !this.helper.isTokenExpired(token)) {
            return true;
        }

        this.router.navigate([''], {queryParams: {returnUrl: routeState.url}}).then(r => console.trace(r));
        return false;
    }
}
