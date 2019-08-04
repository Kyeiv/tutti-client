import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    private http: HttpClient
  ) { }

  submitLogin() {
    this.http.post(`http://localhost:8080/login?username=${this.userName}&password=${this.password}`, {})
      // this.http.post(`http://localhost:8080/login`, {
      //   username: this.userName,
      //   password: this.password
      // })
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

  ngOnInit() {
  }

}
