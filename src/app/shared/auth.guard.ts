import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  private jwt: JwtHelperService = new JwtHelperService();

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {
    if (!localStorage.getItem("token")) {
      this.redirect(url);
      return false;
    }

    const token = this.jwt.decodeToken(localStorage.getItem("token"));
    const principal = token.principal;

    if (token) {
      sessionStorage.setItem("username", token.sub);
      sessionStorage.setItem("principal", principal);
    }

    if (!url.startsWith(`/${principal.toLowerCase()}`)) {
      // this.redirect();
      this.router.navigate([`/${principal.toLowerCase()}`]);
      return false;
    }
    return true;
  }

  private redirect(url: string) {
    this.router.navigate(["/login"]);
  }
}
