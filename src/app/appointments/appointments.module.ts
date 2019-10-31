import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./appointments.component";
import { SharedModule } from "../shared/shared.module";
import { SearchTeachersComponent } from './search-teachers/search-teachers.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';

@NgModule({
  declarations: [AppointmentsComponent, SearchTeachersComponent, MyAppointmentsComponent],
  imports: [CommonModule, AppointmentsRoutingModule, SharedModule]
})
export class AppointmentsModule {}
