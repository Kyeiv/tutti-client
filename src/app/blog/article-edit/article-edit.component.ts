import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Article } from "../classes/article";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Indicator } from "src/app/shared/components/indicator/indicator.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-article-edit",
  templateUrl: "./article-edit.component.html",
  styleUrls: ["./article-edit.component.scss"]
})
export class ArticleEditComponent implements OnInit {
  article: Article = {};
  isAddingNew: boolean = false;
  indicator: Indicator = new Indicator();
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public location: Location
  ) {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" }
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ],
    uploadUrl: "v1/image",
    sanitize: true,
    toolbarPosition: "top"
  };

  public onSave() {
    this.indicator.setBusy(true);
    if (this.isAddingNew) {
      this.http.post(`http://localhost:8080/api/posts`, this.article).subscribe(
        res => {
          this.router.navigate(["../"], { relativeTo: this.route });
          this.indicator.setBusy(false);
        },
        err => {
          console.log(err);
          this.indicator.setBusy(false);
        }
      );
    } else {
      this.http.patch(`http://localhost:8080/api/posts`, this.article).subscribe(
        res => {
          this.indicator.setBusy(false);
        },
        err => {
          console.log(err);
          this.indicator.setBusy(false);
        }
      );
    }
  }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get("articleId");
    if (articleId) {
      this.indicator.setBusy(true);
      this.http.get(`http://localhost:8080/api/post/${articleId}`).subscribe(
        res => {
          this.article = (res as any).postData;
          this.indicator.setBusy(false);
        },
        err => {
          console.log(err);
          this.indicator.setBusy(false);
        }
      );
    } else {
      this.isAddingNew = true;
    }
  }
}
