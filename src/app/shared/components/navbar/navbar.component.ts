import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "./NavLink";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor() {}

  @Input()
  navLinks: NavLink[];

  ngOnInit() {
    console.log(this.navLinks);
    const principal = JSON.parse(sessionStorage.getItem("principal"));
    this.username = principal.principal.username;
  }
}
