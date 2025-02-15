import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./components/login/login.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSelectModule } from "@angular/material/select";
import { IndicatorComponent } from "./components/indicator/indicator.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { DetailsComponent } from "./user-profile/details/details.component";
import { SpecializationsComponent } from "./user-profile/specializations/specializations.component";
import { AvailbilityComponent } from "./user-profile/availbility/availbility.component";
import { UserProfileService } from "./user-profile/user-profile.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [
    LoginComponent,
    IndicatorComponent,
    NavbarComponent,
    UserProfileComponent,
    DetailsComponent,
    SpecializationsComponent,
    AvailbilityComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSelectModule,
    IndicatorComponent,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule,
    NavbarComponent,
    UserProfileComponent,
    MatIconModule,
    MatTableModule,
    NgxMaterialTimepickerModule,
    MatMenuModule
  ],
  providers: [UserProfileService]
})
export class SharedModule {}
