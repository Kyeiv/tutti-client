import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";
import { TeacherService } from "./teacher.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [TeacherComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModule],
  providers: [TeacherService]
})
export class TeacherModule {}
