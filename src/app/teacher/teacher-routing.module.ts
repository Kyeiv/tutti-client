import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeacherComponent } from "./teacher.component";
import { AuthGuard } from "../shared/auth.guard";
import { UserProfileComponent } from "../shared/user-profile/user-profile.component";
import { DetailsComponent } from "../shared/user-profile/details/details.component";
import { SpecializationsComponent } from "../shared/user-profile/specializations/specializations.component";
import { AvailbilityComponent } from "../shared/user-profile/availbility/availbility.component";
import { blogRoutes } from "../blog/blog.module";
import { appointmentsRoutes } from "../appointments/appointments-routing.module";

const routes: Routes = [
  {
    path: "teacher",
    children: [
      {
        path: "my-profile",
        component: UserProfileComponent,
        children: [
          {
            path: "details",
            component: DetailsComponent
          },
          {
            path: "specializations",
            component: SpecializationsComponent
          },
          {
            path: "availbility",
            component: AvailbilityComponent
          },
          {
            path: "**",
            redirectTo: "details"
          }
        ]
      },
      ...blogRoutes,
      ...appointmentsRoutes,
      { path: "**", redirectTo: "appointments" }
    ],
    component: TeacherComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
