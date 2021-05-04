/**
  * @ngdoc service
  * @name AuthGuard
  * 
  * @description only allows logged in user
**/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private readonly router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.isAuthenticated()
    }

    isAuthenticated() {
        const isCookiePresent = this.cookieValue('auth0.is.authenticated');

        if(isCookiePresent === 'true') {
            return true;
        }else {
            return this.router.createUrlTree(['/login']);
        }
    }
    cookieValue(name: string) {
        let searchKey = ''
        if(document.cookie) {
          //check for cookie
          const cookieArray = document.cookie.split(';');
          const cookieElement = cookieArray.find(element => element.includes(name))
    
          if(cookieElement) {
            const index = cookieElement.indexOf('=');
            if(index !== -1) {
              searchKey = cookieElement.substring(index+1);
            }
          }
          
        }

    return searchKey
}
}