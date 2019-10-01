import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeacherComponent } from "./teacher.component";

const routes: Routes = [
  { path: "teacher", children: [], component: TeacherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
