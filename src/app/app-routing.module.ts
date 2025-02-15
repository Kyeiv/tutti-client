import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./shared/components/login/login.component";

const routes: Routes = [
  { path: "home-login", component: LoginComponent },
  { path: "**", pathMatch: "full", redirectTo: "student" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
