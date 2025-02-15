import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Indicator } from "src/app/shared/components/indicator/indicator.model";
import { Article } from "../classes/article";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  indicator: Indicator = new Indicator();
  article: Article = {};
  isAuthor: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get("articleId");
    if (articleId) {
      this.indicator.setBusy(true);
      this.http.get(`http://` + window.location.hostname + `:8080/api/post/${articleId}`).subscribe(
        res => {
          this.article = (res as any).payload;
          this.indicator.setBusy(false);
          this.isAuthor = this.article.username == sessionStorage.getItem("username");
        },
        err => {
          console.log(err);
          this.indicator.setBusy(false);
        }
      );
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }

  public onDelete(articleId: number) {
    this.indicator.setBusy(true);
    this.http.delete(`http://` + window.location.hostname + `:8080/api/posts/${articleId}`).subscribe(
      res => {
        this.indicator.setBusy(false);
        this.router.navigate(["../.."], { relativeTo: this.route });
      },
      err => {
        console.log(err);
        this.indicator.setBusy(false);
      }
    );
  }
}
