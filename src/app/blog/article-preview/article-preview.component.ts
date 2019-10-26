import { Component, OnInit } from "@angular/core";
import { Article } from "../classes/article";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Indicator } from "src/app/shared/components/indicator/indicator.model";

@Component({
  selector: "app-article-preview",
  templateUrl: "./article-preview.component.html",
  styleUrls: ["./article-preview.component.scss"]
})
export class ArticlePreviewComponent implements OnInit {
  isAuthor: boolean = false;
  userId: string = null;
  indicator: Indicator = new Indicator();
  public articles: Article[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPosts();
  }

  public getPosts() {
    this.indicator.setBusy(true);
    this.userId = this.route.parent.snapshot.paramMap.get("username");
    if (this.userId) {
      this.isAuthor = this.userId === sessionStorage.getItem("username");
      this.http.get(`http://localhost:8080/api/posts/${this.userId}`).subscribe(
        res => {
          this.articles = (res as any).payload;
          this.indicator.setBusy(false);
        },
        err => {
          console.log(err);
          this.indicator.setBusy(false);
        }
      );
    } else {
      this.router.navigate(["/login"]);
    }
  }

  public onDelete(articleId: number) {
    this.indicator.setBusy(true);
    this.http.delete(`http://localhost:8080/api/posts/${articleId}`).subscribe(
      res => {
        this.getPosts();
      },
      err => {
        console.log(err);
        this.indicator.setBusy(false);
      }
    );
  }
}
