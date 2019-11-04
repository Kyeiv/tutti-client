import { Component, OnInit } from "@angular/core";
import { NavLink } from "../shared/components/navbar/NavLink";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"]
})
export class AppointmentsComponent implements OnInit {
  constructor() {}

  navLinks: NavLink[];

  ngOnInit() {
    const principal = JSON.parse(sessionStorage.getItem("principal"));
    const authority = principal.authorities[0].authority.toLowerCase();

    switch (authority) {
      case "student":
        this.navLinks = [{ label: "My Appointments", path: "my-appointments" }, { label: "Search", path: "search" }];
        break;
      case "teacher":
        this.navLinks = [{ label: "My Appointments", path: "my-appointments" }];
        break;
    }
  }
}
