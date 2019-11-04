import { Component, OnInit } from "@angular/core";
import { LEVELS } from "src/app/shared/classes/specialization-levels.enum";
import { NAMES } from "src/app/shared/classes/specialization-names.enum";
import { HttpClient } from "@angular/common/http";
import { UserDetails } from "src/app/shared/user-profile/user-profile.service";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-search-teachers",
  templateUrl: "./search-teachers.component.html",
  styleUrls: ["./search-teachers.component.scss"]
})
export class SearchTeachersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  query: SearchQuery = {};
  teachers$: ReplaySubject<UserBasicInfo[]> = new ReplaySubject();
  public levels: LEVELS[] = [LEVELS.PRIMARY_SCHOOL, LEVELS.HIGH_SCHOOL, LEVELS.UNIVERSITY];
  public specializationNames: NAMES[] = [NAMES.HUMANITIES, NAMES.SCIENCE, NAMES.ENGLISH];
  public displayedColumns: string[] = ["index", "name", "level", "action"];

  ngOnInit() {}

  public sendQuery() {
    this.http.post(`http://localhost:8080/api/users/search`, this.query).subscribe(
      res => {
        console.log(res);
        const teachers = (res as any).payload.map(
          teacher =>
            ({
              username: teacher.username,
              name: teacher.userDetails.name,
              surname: teacher.userDetails.surname
            } as UserBasicInfo)
        );
        this.teachers$.next(teachers);
      },
      err => {
        console.log(err);
      }
    );
  }

  public makeAppointment(element) {}
}

export interface SearchQuery {
  city?: string;
  level?: LEVELS;
  specializationName?: NAMES;
}

export interface UserBasicInfo {
  name: string;
  surname: string;
  username: string;
}
