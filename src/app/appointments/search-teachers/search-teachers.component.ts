import { Component, OnInit } from "@angular/core";
import { LEVELS } from "src/app/shared/classes/specialization-levels.enum";
import { NAMES } from "src/app/shared/classes/specialization-names.enum";
import { HttpClient } from "@angular/common/http";
import { UserDetails } from "src/app/shared/user-profile/user-profile.service";
import { ReplaySubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MakeAppointemntDialogComponent } from "./make-appointemnt-dialog/make-appointemnt-dialog.component";
import { UserBasicInfo } from "./make-appointemnt-dialog/classes/user-basic-info";

@Component({
  selector: "app-search-teachers",
  templateUrl: "./search-teachers.component.html",
  styleUrls: ["./search-teachers.component.scss"]
})
export class SearchTeachersComponent implements OnInit {
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  query: SearchQuery = {};
  teachers$: ReplaySubject<UserBasicInfo[]> = new ReplaySubject();
  public levels: LEVELS[] = [LEVELS.PRIMARY_SCHOOL, LEVELS.HIGH_SCHOOL, LEVELS.UNIVERSITY];
  public specializationNames: NAMES[] = [
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
  public displayedColumns: string[] = ["index", "name", "level", "salary", "action"];

  ngOnInit() {}

  public sendQuery() {
    this.http.post(`http://` + window.location.hostname + `:8080/api/users/search`, this.query).subscribe(
      res => {
        console.log(res);
        const teachers = (res as any).payload.map(
          t =>
            ({
              teacher: {
                username: t.key.username,
                name: t.key.userDetails.name,
                surname: t.key.userDetails.surname
              },
              salary: t.value.salary
            } as TeacherWithSalary)
        );
        this.teachers$.next(teachers);
      },
      err => {
        console.log(err);
      }
    );
  }

  public makeAppointment(element) {
    this.dialog.open(MakeAppointemntDialogComponent, { data: element.teacher });
  }
}

export interface TeacherWithSalary {
  teacher: UserBasicInfo;
  salary: number;
}

export interface SearchQuery {
  city?: string;
  level?: LEVELS;
  specializationName?: NAMES;
}
