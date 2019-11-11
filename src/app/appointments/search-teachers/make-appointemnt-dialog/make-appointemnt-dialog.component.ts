import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { UserBasicInfo } from "./classes/user-basic-info";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as Moment from "moment";
import { MatTabGroup, MatTabNav } from "@angular/material/tabs";
import { ReplaySubject, of, Observable, combineLatest } from "rxjs";
import { tap, switchMap, map, startWith, shareReplay, filter, switchMapTo } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-make-appointemnt-dialog",
  templateUrl: "./make-appointemnt-dialog.component.html",
  styleUrls: ["./make-appointemnt-dialog.component.scss"]
})
export class MakeAppointemntDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MakeAppointemntDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserBasicInfo,
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) {}

  @ViewChild(MatTabNav, { static: true }) tabGroup: MatTabNav;
  appointmentData: {};
  dates: TabDate[] = [];
  appointmentsCache: WeakMap<Moment.Moment, any> = new WeakMap();

  selectedTabSource: ReplaySubject<TabDate> = new ReplaySubject();

  appointmentDate$: Observable<AppointHourAvailbility[]> = this.selectedTabSource.pipe(
    tap(tabDate => this.dates.forEach(date => (date.isActive = date === tabDate))),
    switchMap(tabDate => this.getAppointmentData(tabDate)),
    shareReplay()
  );

  buttonSelected$ = new ReplaySubject();
  isAnySelected$: Observable<boolean> = combineLatest(
    this.appointmentDate$,
    this.buttonSelected$.pipe(startWith())
  ).pipe(map(([hours]) => hours.some(hour => hour.isSelected)));

  currentDate = Moment();

  getAppointmentData(tabDate: TabDate): Observable<AppointHourAvailbility[]> {
    return this.http
      .post("http://localhost:8080/api/users/get-day-availbility", {
        teacherUsername: this.data.username,
        date: tabDate.date.toDate()
      })
      .pipe(
        map(response => {
          const payload = (response as any).payload;
          const hours: AppointHourAvailbility[] = [];
          for (const key in payload) {
            const value = payload[key];
            hours.push({
              hour: parseInt(key),
              date: tabDate.date.toDate(),
              isAvailable: value
            });
          }
          return hours;
        })
      );
  }
  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dates = this.acquireDates(Moment()).map(this.mapToTabDates);

    if (this.dates.length > 0) {
      this.onTabSelected(this.dates[0]);
    }
  }

  onTabSelected(date: TabDate) {
    this.selectedTabSource.next(date);
  }

  acquireDates(startDate: Moment.Moment) {
    const end = Moment(startDate).endOf("month");

    const dates = [];
    let date = Moment(startDate);
    while (date.isBefore(end)) {
      dates.push(date);
      date = Moment(date).add(1, "day");
    }

    console.log(dates);
    return dates;
  }

  mapToTabDates(moment: Moment.Moment) {
    return {
      isActive: false,
      date: moment
    };
  }

  addAppointment() {
    this.appointmentDate$
      .pipe(
        map(day => day.filter(d => d.isSelected)),
        map(day => ({
          teacherName: this.data.username,
          studentName: sessionStorage.getItem("username"),
          dateTimes: day.map(d =>
            // Moment(d.date)
            //   .set("hours", d.hour)
            //   .set("minutes", 0)
            //   .toDate()
            {
              const tempDate = new Date(d.date);
              tempDate.setHours(d.hour);
              tempDate.setMinutes(0);
              return tempDate;
            }
          )
        })),
        switchMap(day => this.http.post("http://localhost:8080/api/users/appointment", day)),
        tap(res => {
          this.matSnackBar.open("Appointment made succesfully!", "", { duration: 2000, panelClass: "center-snackbar" });
          this.dialogRef.close();
        })
      )
      .subscribe();
  }
}

export interface TabDate {
  date: Moment.Moment;
  isActive: boolean;
}

export interface AppointHourAvailbility {
  hour: number;
  date: Date;
  isAvailable: boolean;
  isSelected?: boolean;
}
