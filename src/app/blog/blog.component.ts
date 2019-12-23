import { Component, OnInit } from "@angular/core";
import { NavLink } from "../shared/components/navbar/NavLink";
import { studentNavlinks, teacherNavlinks } from "../shared/classes/navlinks";
import { Router } from "@angular/router";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"]
})
export class BlogComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
