import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentComponent } from "./student.component";
import { StudentRoutingModule } from "./student-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CookieInterceptor } from "../shared/services/cookie.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true }]
})
export class StudentModule {}
