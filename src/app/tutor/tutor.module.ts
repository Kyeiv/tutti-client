import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './tutor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TutorComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    SharedModule
  ],
  providers: [

  ]
})
export class TutorModule { }
