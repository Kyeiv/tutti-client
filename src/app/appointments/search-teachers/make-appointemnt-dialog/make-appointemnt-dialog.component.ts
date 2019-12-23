import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { UserBasicInfo } from "./classes/user-basic-info";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as Moment from "moment";
import { MatTabGroup, MatTabNav } from "@angular/material/tabs";
import { ReplaySubject, of, Observable, combineLatest } from "rxjs";
import { tap, switchMap, map, startWith, shareReplay, filter, switchMapTo } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SharedService } from "src/app/shared/services/shared.service";

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
    private toaster: SharedService
  ) {}

  @ViewChild(MatTabNav, { static: true }) tabGroup: MatTabNav;
  appointmentData: {};
  dates: TabDate[] = [];
  appointmentsCache: WeakMap<Moment.Moment, any> = new WeakMap();

  selectedTabSource: ReplaySubject<TabDate> = new ReplaySubject();

  appointmentDate$: Observable<AppointHourAvailbility[]> = this.selectedTabSource.pipe(
    tap(tabDate => this.dates.forEach(date => (date.isActive = date === tabDate))),
    switchMap(tabDate => this.getAppointmentData(tabDate)),
    tap(data => this.tabGroup.updateActiveLink()),
    shareReplay(1)
  );

  buttonSelected$ = new ReplaySubject();
  isAnySelected$: Observable<boolean> = combineLatest(
    this.appointmentDate$,
    this.buttonSelected$.pipe(startWith())
  ).pipe(map(([hours]) => hours.some(hour => hour.isSelected)));

  currentDate = Moment();

  getAppointmentData(tabDate: TabDate): Observable<AppointHourAvailbility[]> {
    return this.http
      .post(`http://` + window.location.hostname + `:8080/api/users/get-day-availbility`, {
        teacherUsername: this.data.username,
        date: tabDate.date.toDate()
      })
      .pipe(
        map(response => {
          const payload = (response as any).payload;
          const currentDate = new Date();
          const hours: AppointHourAvailbility[] = [];
          const isPast = (d1, d2) => {
            const day1 = new Date(Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate()));
            const day2 = new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate()));
            return day1.getTime() > day2.getTime();
          };
          const isPresent = (d1, d2) => {
            const day1 = new Date(Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate()));
            const day2 = new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate()));
            return day1.getTime() === day2.getTime();
          };
          for (const key in payload) {
            const value = payload[key];
            hours.push({
              hour: parseInt(key),
              date: tabDate.date.toDate(),
              isAvailable: isPast(currentDate, tabDate.date.toDate())
                ? false
                : isPresent(currentDate, tabDate.date.toDate())
                ? value && Number(key) > currentDate.getHours()
                : value
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
    this.currentDate = Moment();
    this.generateDates();
  }

  public previousMonth() {
    this.currentDate.subtract(1, "month");
    if (this.currentDate.year() !== Moment().year() || this.currentDate.month() !== Moment().month()) {
      this.currentDate.set("date", 1);
    } else {
      this.currentDate.set("date", Moment().date());
    }
    this.generateDates();
  }

  public nextMonth() {
    this.currentDate.add(1, "month");
    if (this.currentDate.year() !== Moment().year() || this.currentDate.month() !== Moment().month()) {
      this.currentDate.set("date", 1);
    } else {
      this.currentDate.set("date", Moment().date());
    }
    this.generateDates();
  }

  public generateDates() {
    this.dates = this.acquireDates(this.currentDate).map(this.mapToTabDates);

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
        switchMap(day => this.http.post(`http://` + window.location.hostname + `:8080/api/users/appointment`, day)),
        tap(res => {
          this.toaster.openSnackBar("Lekcja umówiona pomyślnie!");
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
