import { Component, OnInit } from "@angular/core";
import { NavLink } from "../shared/components/navbar/NavLink";
import { teacherNavlinks } from "../shared/classes/navlinks";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"]
})
export class TeacherComponent implements OnInit {
  constructor() {}

  navLinks: NavLink[] = teacherNavlinks;

  ngOnInit() {}
}
