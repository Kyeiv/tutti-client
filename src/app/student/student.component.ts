import { Component, OnInit } from "@angular/core";
import { NavLink } from "../shared/components/navbar/NavLink";
import { studentNavlinks } from "../shared/classes/navlinks";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  constructor() {}

  navLinks: NavLink[] = [];

  ngOnInit() {
    const username = sessionStorage.getItem("username");
    this.navLinks = studentNavlinks;
  }
}
