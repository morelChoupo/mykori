import {AuthService} from '../auth/auth.service';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        const rol = new JwtHelperService().decodeToken(this.authService.currenTokenValue).role as string[];
        const noExpectedRole = route.data['noExpectedRole'];

        return rol === expectedRole || rol !== noExpectedRole;
    }
}
