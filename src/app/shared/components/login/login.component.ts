import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Indicator } from "../indicator/indicator.model";
import { flatMap, tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login: Login = {};
  register: Register = {};
  registerForm: FormGroup = null;
  backgroundIndex: number;
  bgClass: string;
  currentTab: number = 0;
  indicator: Indicator = new Indicator();
  passwordsMatcher = new RepeatPasswordEStateMatcher();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: SharedService
  ) {}

  submitLogin() {
    this.indicator.setBusy(true);
    this.http
      .post(`http://localhost:8080/login`, { username: this.login.username, password: this.login.password })
      .pipe(
        tap(res => localStorage.setItem("token", (res as any).token)),
        flatMap(() => this.http.get(`http://localhost:8080/auth/whoami`)),
        tap(res => sessionStorage.setItem("principal", JSON.stringify(res))),
        tap(res => {
          this.router.navigate([((res as any).authorities[0].authority as string).toLowerCase()]);
          this.indicator.setBusy(false);
          this.login = {};
        }),
        catchError((err, caught) => {
          this.indicator.setBusy(false);
          this.toaster.openSnackBar("Login error!");
          throw caught;
        })
      )
      .subscribe();
  }

  submitRegister() {
    this.register = this.registerForm.value;
    delete this.register.confirmPassword;

    this.indicator.setBusy(true);

    this.http.post(`http://localhost:8080/auth/registration`, this.register).subscribe(
      res => {
        this.toaster.openSnackBar("Registered succesfully!");
        this.registerForm.reset();
        this.currentTab = 0;
        this.indicator.setBusy(false);
      },
      err => {
        this.toaster.openSnackBar("Registered error!");
        this.indicator.setBusy(false);
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.generateForm();
    this.backgroundIndex = Math.floor(Math.random() * 3 + 1);
    this.bgClass = `login-bg-${this.backgroundIndex}`;
    console.log(this.backgroundIndex);
  }

  private generateForm() {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.compose([Validators.required, Validators.pattern(/[A-Za-z0-9]{3,20}/)])],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_,\.])[A-Za-z\d@$!%*#?&-_,\.]{5,64}/)
          ])
        ],
        confirmPassword: ["", Validators.compose([Validators.required])],
        name: ["", Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
        surname: ["", Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
        authority: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
        city: ["", Validators.compose([Validators.required, Validators.pattern(/\w*/)])],
        mail: ["", Validators.compose([Validators.required, Validators.pattern(/^(.+)@(.+)$/)])],
        phone: ["", Validators.compose([Validators.required, Validators.pattern(/[0-9]{9,9}/)])]
      },
      { validator: RepeatPasswordValidator }
    );
  }
}

interface Login {
  username?: string;
  password?: string;
}

interface Register {
  username?: string;
  password?: string;
  confirmPassword?: string;
  authority?: string;
  city?: string;
  country?: string;
  mail?: string;
  name?: string;
  surname?: string;
  phone?: string;
}

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.parent.get("password").value !== control.parent.get("confirmPassword").value;
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.confirmPassword.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
