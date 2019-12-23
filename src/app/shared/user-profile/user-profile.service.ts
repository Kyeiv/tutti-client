import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserProfileService {
  private detailsSource: BehaviorSubject<UserDetails> = new BehaviorSubject(null);
  details$: Observable<UserDetails> = this.detailsSource.asObservable();
  constructor(private http: HttpClient) {}

  public getUserDetails() {
    this.http.get(`http://` + window.location.hostname + `:8080/api/user-details`).subscribe(
      res => {
        this.detailsSource.next((res as any).payload);
      },
      err => {
        console.log(err);
      }
    );
  }

  public setUserDetails(userDetails: UserDetails) {
    this.http.put(`http://` + window.location.hostname + `:8080/api/user-details`, userDetails).subscribe(
      res => {
        this.detailsSource.next(userDetails);
      },
      err => {
        console.log(err);
      }
    );
  }
}

export interface UserDetails {
  city?: string;
  country?: string;
  mail?: string;
  surname?: string;
  name?: string;
  phone?: string;
}
