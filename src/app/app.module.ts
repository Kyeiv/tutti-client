import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TutorModule } from './tutor/tutor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './shared/services/shared.service';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieInterceptor } from './shared/services/cookie.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TutorModule,
    BrowserAnimationsModule
  ],
  providers: [
    SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
