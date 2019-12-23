import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "./NavLink";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(private router: Router) {}

  @Input()
  navLinks: NavLink[];

  ngOnInit() {
    console.log(this.navLinks);
    const username = sessionStorage.getItem("username");
    this.username = username;
  }

  public logout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    this.router.navigate(["/login-site"]);
  }
}
