import { Component, OnInit } from "@angular/core";
import { NavLink } from "../components/navbar/NavLink";
import { UserProfileService } from "./user-profile.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(private userProfileService: UserProfileService) {}

  navLinks: NavLink[];

  ngOnInit() {
    const principal = sessionStorage.getItem("principal");
    const authority = principal.toLowerCase();

    switch (authority) {
      case "teacher":
        this.navLinks = [
          { label: "Details", path: "details" },
          { label: "Specializations", path: "specializations" },
          { label: "Availbility", path: "availbility" }
        ];
        break;
      case "student":
        this.navLinks = [{ label: "Details", path: "details" }];
        break;
    }
  }
}
