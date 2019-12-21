import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-availbility",
  templateUrl: "./availbility.component.html",
  styleUrls: ["./availbility.component.scss"]
})
export class AvailbilityComponent implements OnInit {
  public dataSource: Availbility[] = [];
  public displayedColumns: string[] = ["index", "dayOfTheWeek", "hourBegin", "hourEnd", "action"];
  public days = [
    { key: "Poniedziałek", value: DAYS.MONDAY },
    { key: "Wtorek", value: DAYS.TUESDAY },
    { key: "Środa", value: DAYS.WEDNESDAY },
    { key: "Czwartek", value: DAYS.THURSDAY },
    { key: "Piątek", value: DAYS.FRIDAY },
    { key: "Sobota", value: DAYS.SATURDAY },
    { key: "Niedziela", value: DAYS.SUNDAY }
  ];
  constructor(private http: HttpClient, private toaster: SharedService) {}

  ngOnInit() {
    this.getAvailbilities();
  }

  public onEdit(element: Availbility) {
    element.isEdit = true;
  }

  public onDelete(element: Availbility) {
    if (element.isNew) {
      this.dataSource.splice(this.dataSource.indexOf(element), 1);
      this.dataSource = [...this.dataSource];
    } else {
      this.http.delete(`http://localhost:8080/api/availbilities/${element.id}`).subscribe(
        res => {
          this.dataSource.splice(this.dataSource.indexOf(element), 1);
          this.dataSource = [...this.dataSource];
        },
        err => console.log(err)
      );
    }
  }

  public onAdd() {
    const ava: Availbility = {};
    ava.isEdit = true;
    ava.isNew = true;
    this.dataSource.push(ava);
    this.dataSource = [...this.dataSource];
  }

  public getAvailbilities() {
    this.http.get(`http://localhost:8080/api/availbilities`).subscribe(
      res => {
        (res as any).payload.forEach((avaibility: Availbility) => {
          avaibility.hourBegin = avaibility.hourBegin.substr(0, avaibility.hourBegin.lastIndexOf(":"));
          avaibility.hourEnd = avaibility.hourEnd.substr(0, avaibility.hourEnd.lastIndexOf(":"));
        });
        this.dataSource = (res as any).payload;
      },
      err => console.log(err)
    );
  }

  public onSave(element: Availbility) {
    if (element.hourBegin >= element.hourEnd) {
      this.toaster.openSnackBar("Godzina początkowa musi być mniejsza od końcowej!");
      return;
    }
    if (element.id) {
      this.http.patch(`http://localhost:8080/api/availbilities`, element).subscribe(
        res => {
          element.isEdit = false;
        },
        err => console.log(err)
      );
    } else {
      this.http.post(`http://localhost:8080/api/availbilities`, element).subscribe(
        res => {
          element.isEdit = false;
          element.isNew = false;
          element.id = (res as any).payload;
        },
        err => console.log(err)
      );
    }
  }

  public getDayName(day: DAYS) {
    return this.days.some(d => d.value === day) ? this.days.find(d => d.value === day).key : "undefined";
  }
}

export interface Availbility {
  hourBegin?: string;
  hourEnd?: string;
  id?: number;
  isEdit?: boolean;
  isNew?: boolean;
  dayOfTheWeek?: DAYS;
}

export enum DAYS {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY
}
