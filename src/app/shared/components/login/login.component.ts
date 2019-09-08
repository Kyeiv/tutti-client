import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = {};
  register: Register = {};

  constructor(
    private http: HttpClient
  ) { }

  submitLogin() {
    this.http.post(`http://localhost:8080/login?username=${this.login.username}&password=${this.login.password}`, {})
      .subscribe(
        (res) => {
          console.log('res');

          this.http.get(`http://localhost:8080/api/employees`).subscribe(
            (res) => {
              console.log(res)
            }
          )
        },
        (err) => {
          console.log(err);
        },
      )
  }

  submitRegister() {
    this.http.post(`http://localhost:8080/auth/registration`, this.register)
      .subscribe(
        (res) => {
          console.log('dupa');
        },
        (err) => {
          console.log(err);
        },
      )
  }

  ngOnInit() {
  }

}

interface Login {
  username?: string;
  password?: string;
}

interface Register {
  username?: string;
  password?: string;
  authority?: string;
  city?: string;
  country?: string;
  mail?: string;
  name?: string;
  surname?: string;
  phone?: string;
} 
