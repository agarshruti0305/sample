/**
  * @ngdoc service
  * @name Auth0Interceptor
  * @description Adding authentication token to all the out going request
**/

import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable()
export class Auth0Interceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const authToken = localStorage.getItem('token');

        if (authToken) {
            // console.log(authToken)
            const modifiedRequest = request.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${authToken}`
                })
            })

            return next.handle(modifiedRequest);
        }

        return next.handle(request);
    }

}