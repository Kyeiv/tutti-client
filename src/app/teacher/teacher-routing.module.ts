import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeacherComponent } from "./teacher.component";
import { AuthGuard } from "../shared/auth.guard";

const routes: Routes = [
  {
    path: "teacher",
    children: [],
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
