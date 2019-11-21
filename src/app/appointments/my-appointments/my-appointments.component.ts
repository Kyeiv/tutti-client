import { Component, OnInit } from "@angular/core";
import { UserBasicInfo } from "../search-teachers/make-appointemnt-dialog/classes/user-basic-info";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-my-appointments",
  templateUrl: "./my-appointments.component.html",
  styleUrls: ["./my-appointments.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ]
})
export class MyAppointmentsComponent implements OnInit {
  columnsToDisplay = ["date"];
  dataSource: Appointment[] = [];
  expandedElement: Appointment | null;
  currentDate: Date = new Date();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMyAppointments();
  }

  public getMyAppointments() {
    this.http.get("http://localhost:8080/api/users/my-appointments").subscribe(res => {
      this.dataSource = (res as any).payload
        .map(app => ({
          id: app.id,
          date: new Date(app.date),
          attendeeMail: app.mail,
          attendeePhone: app.phone,
          attendee: {
            name: app.name,
            surname: app.surname,
            username: app.username
          }
        }))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
    });
  }

  public deleteAppointment(element) {
    this.http
      .delete(`http://localhost:8080/api/users/remove-appointment/${element.id}`)
      .subscribe(res => this.getMyAppointments(), err => console.log(err));
  }

  public isFromPast(date: Date) {
    return this.currentDate > date;
  }
}

export interface Appointment {
  date: Date;
  attendee: UserBasicInfo;
  attendeeMail: number;
  attendeePhone: string;
}
