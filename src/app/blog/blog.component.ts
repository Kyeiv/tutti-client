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
  // navLinks: NavLink[];
  ngOnInit() {
  //   const principal = JSON.parse(sessionStorage.getItem("principal"));
  //   const principalName = principal.authorities[0].authority.toLowerCase();
  //   switch (principalName) {
  //     case "teacher":
  //       this.navLinks = teacherNavlinks;
  //       break;
  //     case "student":
  //       this.navLinks = studentNavlinks;
  //       break;
  //     default:
  //       this.router.navigate(["/login"]);
  //       break;
  //   }
  // }
  }
}
