import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LEVELS } from "../../classes/specialization-levels.enum";
import { NAMES } from "../../classes/specialization-names.enum";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-specializations",
  templateUrl: "./specializations.component.html",
  styleUrls: ["./specializations.component.scss"]
})
export class SpecializationsComponent implements OnInit {
  public dataSource: Specialization[] = [];
  public displayedColumns: string[] = ["index", "name", "level", "salary", "action"];
  public levels: LEVELS[] = [LEVELS.PRIMARY_SCHOOL, LEVELS.HIGH_SCHOOL, LEVELS.UNIVERSITY];
  public names: NAMES[] = [
    NAMES.POLISH,
    NAMES.GERMAN,
    NAMES.ENGLISH,
    NAMES.HISTORY,
    NAMES.GEOGRAPHY,
    NAMES.BIOLOGY,
    NAMES.MATHS,
    NAMES.INFORMATICS,
    NAMES.PHYSICS,
    NAMES.CHEMISTRY
  ];
  constructor(private http: HttpClient, private toaster: SharedService) {}

  ngOnInit() {
    this.getSpecializations();
  }

  public onEdit(element: Specialization) {
    element.isEdit = true;
  }

  public onDelete(element: Specialization) {
    if (element.isNew) {
      this.dataSource.splice(this.dataSource.indexOf(element), 1);
      this.dataSource = [...this.dataSource];
    } else {
      this.http.delete(`http://` + window.location.hostname + `:8080/api/specializations/${element.id}`).subscribe(
        res => {
          this.dataSource.splice(this.dataSource.indexOf(element), 1);
          this.dataSource = [...this.dataSource];
        },
        err => console.log(err)
      );
    }
  }

  public onAdd() {
    const spec: Specialization = {};
    spec.isEdit = true;
    spec.isNew = true;
    this.dataSource.push(spec);
    this.dataSource = [...this.dataSource];
  }

  public getSpecializations() {
    this.http.get(`http://` + window.location.hostname + `:8080/api/specializations`).subscribe(
      res => {
        this.dataSource = (res as any).payload;
      },
      err => console.log(err)
    );
  }

  public onSave(element: Specialization) {
    if (
      this.dataSource.some(
        spec => spec.level == element.level && spec.name == element.name && !spec.isNew && !spec.isEdit
      )
    ) {
      this.toaster.openSnackBar("Taka specjalizacja już istnieje!");
      return;
    }

    if (element.id) {
      this.http.patch(`http://` + window.location.hostname + `:8080/api/specializations`, element).subscribe(
        res => {
          element.isEdit = false;
        },
        err => console.log(err)
      );
    } else {
      this.http.post(`http://` + window.location.hostname + `:8080/api/specializations`, element).subscribe(
        res => {
          element.isEdit = false;
          element.isNew = false;
          element.id = (res as any).payload;
        },
        err => console.log(err)
      );
    }
  }
}

export interface Specialization {
  level?: string;
  name?: string;
  salary?: number;
  isEdit?: boolean;
  isNew?: boolean;
  id?: number;
}
