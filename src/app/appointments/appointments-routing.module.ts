import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentsComponent } from "./appointments.component";
import { SearchTeachersComponent } from "./search-teachers/search-teachers.component";
import { MyAppointmentsComponent } from "./my-appointments/my-appointments.component";

export const appointmentsRoutes: Routes = [
  {
    component: AppointmentsComponent,
    path: "appointments",
    children: [
      { path: "search", component: SearchTeachersComponent },
      { path: "my-appointments", component: MyAppointmentsComponent },
      { path: "**", redirectTo: "my-appointments" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {}
