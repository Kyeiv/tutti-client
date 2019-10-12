import { Component, OnInit } from "@angular/core";
import { NavLink } from "../shared/components/navbar/NavLink";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"]
})
export class TeacherComponent implements OnInit {
  constructor() {}

  navLinks: NavLink[] = [
    { label: "Appointments", path: "appointments" },
    { label: "Blog", path: "blog" },
    { label: "My profile", path: "my-profile" }
  ];

  ngOnInit() {}
}
