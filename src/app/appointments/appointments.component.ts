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
    const principal = sessionStorage.getItem("principal");
    const authority = principal.toLowerCase();

    switch (authority) {
      case "student":
        this.navLinks = [
          { label: "Moje lekcje", path: "my-appointments" },
          { label: "Szukaj", path: "search" }
        ];
        break;
      case "teacher":
        this.navLinks = [{ label: "Moje lekcje", path: "my-appointments" }];
        break;
    }
  }
}
