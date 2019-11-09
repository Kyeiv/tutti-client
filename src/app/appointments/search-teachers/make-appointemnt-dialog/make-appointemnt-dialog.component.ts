import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { UserBasicInfo } from "./classes/user-basic-info";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as Moment from "moment";
import { MatTabGroup, MatTabNav } from "@angular/material/tabs";
import { ReplaySubject, of } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-make-appointemnt-dialog",
  templateUrl: "./make-appointemnt-dialog.component.html",
  styleUrls: ["./make-appointemnt-dialog.component.scss"]
})
export class MakeAppointemntDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MakeAppointemntDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserBasicInfo,
    private http: HttpClient
  ) {}

  @ViewChild(MatTabNav, { static: true }) tabGroup: MatTabNav;
  appointmentData: {};
  dates: TabDate[] = [];
  appointmentsCache: WeakMap<Moment.Moment, any> = new WeakMap();

  selectedTabSource: ReplaySubject<TabDate> = new ReplaySubject();

  appointmentDate$ = this.selectedTabSource.pipe(
    tap(tabDate => this.dates.forEach(date => (date.isActive = date === tabDate))),
    switchMap(tabDate =>
      this.appointmentsCache.has(tabDate.date)
        ? of(this.appointmentsCache.get(tabDate.date))
        : this.getAppointmentData(tabDate)
    )
  );

  currentDate = Moment();

  getAppointmentData(tabDate: TabDate): any {
    return this.http.post("google.com", { teacherUsername: this.data.username, date: tabDate.date.toDate() });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dates = this.acquireDates(Moment()).map(this.mapToTabDates);

    if (this.dates.length > 0) {
      this.dates[0].isActive = true;
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
}

export interface TabDate {
  date: Moment.Moment;
  isActive: boolean;
}
