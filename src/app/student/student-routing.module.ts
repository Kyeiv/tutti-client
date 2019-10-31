import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentComponent } from "./student.component";
import { AuthGuard } from "../shared/auth.guard";
import { UserProfileComponent } from "../shared/user-profile/user-profile.component";
import { DetailsComponent } from "../shared/user-profile/details/details.component";
import { blogRoutes } from "../blog/blog.module";

const routes: Routes = [
  {
    path: "student",
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
            path: "**",
            redirectTo: "details"
          }
        ]
      },
      ...blogRoutes
    ],
    component: StudentComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
