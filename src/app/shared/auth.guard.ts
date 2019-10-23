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

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {
    if (!sessionStorage.getItem("principal")) {
      this.redirect(url);
      return false;
    }

    const principal = JSON.parse(sessionStorage.getItem("principal"));

    if (principal && principal.principal) {
       sessionStorage.setItem('username', principal.principal.username);
    }

    if (
      !url.startsWith(`/${principal.authorities[0].authority.toLowerCase()}`)
    ) {
      this.redirect(url);
      return false;
    }
    return true;
  }

  private redirect(url: string) {
    this.router.navigate(["/login"]);
  }
}
