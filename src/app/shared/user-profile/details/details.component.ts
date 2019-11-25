import { Component, OnInit } from "@angular/core";
import { UserProfileService, UserDetails } from "../user-profile.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { flatMap, tap, filter } from "rxjs/operators";
import { Indicator } from "../../components/indicator/indicator.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  private userDetails: UserDetails;
  detailsForm: FormGroup = null;
  canSave: boolean = false;
  indicator: Indicator = new Indicator();
  constructor(public userProfileService: UserProfileService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userProfileService.details$
      .pipe(
        filter(details => !!details),
        tap(details => {
          this.userDetails = details;
          this.buildForm();
          this.indicator.setBusy(false);
        })
      )
      .subscribe();
    this.userProfileService.getUserDetails();
    this.indicator.setBusy(true);
  }

  private buildForm() {
    this.detailsForm = this.formBuilder.group({
      name: [this.userDetails.name, Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
      surname: [this.userDetails.surname, Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
      country: [this.userDetails.country, Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
      city: [this.userDetails.city, Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
      mail: [this.userDetails.mail, Validators.compose([Validators.required, Validators.pattern(/^(.+)@(.+)$/)])],
      phone: [this.userDetails.phone, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{9}$/)])]
    });
    this.detailsForm.valueChanges.subscribe(() => this.onDetailsFormChanged());
  }

  private onDetailsFormChanged() {
    const values = this.detailsForm.value;
    this.canSave = false;
    for (const key in values) {
      if (this.userDetails[key] !== values[key]) {
        this.canSave = true;
        break;
      }
    }
  }

  submitDetails() {
    this.indicator.setBusy(true);
    this.userProfileService.setUserDetails(this.detailsForm.value);
  }
}
