import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./appointments.component";
import { SharedModule } from "../shared/shared.module";
import { SearchTeachersComponent } from "./search-teachers/search-teachers.component";
import { MyAppointmentsComponent } from "./my-appointments/my-appointments.component";
import { MakeAppointemntDialogComponent } from "./search-teachers/make-appointemnt-dialog/make-appointemnt-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieInterceptor } from "../shared/services/cookie.interceptor";

@NgModule({
  declarations: [
    AppointmentsComponent,
    SearchTeachersComponent,
    MyAppointmentsComponent,
    MakeAppointemntDialogComponent
  ],
  imports: [CommonModule, AppointmentsRoutingModule, SharedModule, MatDialogModule],
  entryComponents: [MakeAppointemntDialogComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true }]
})
export class AppointmentsModule {}
