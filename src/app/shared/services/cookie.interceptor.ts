import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const request = req.clone({
            setHeaders: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        });
        console.log(request);

        return next.handle(request).pipe(
            tap((response) => {
                console.log(response);
                // response.headers.get('Set-Cookie')
            })
        )
    }
}