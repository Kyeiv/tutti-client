import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { tap, catchError } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*"
        // Authorization: "Bearer " + localStorage.getItem("token")
      }
      //   withCredentials: true
    });

    if (localStorage.getItem("token")) {
      request = req.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
        //   withCredentials: true
      });
    }
    console.log(request);

    return next.handle(request).pipe(
      tap(response => {
        console.log(response);
        // response.headers.get('Set-Cookie')
      }),
      catchError((err: HttpErrorResponse, caugth) => {
        if (err && err.status == 401) {
          localStorage.removeItem("token");
        }
        throw caugth;
      })
    );
  }
}
