import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogComponent } from "./blog.component";
import { ArticleComponent } from "./article/article.component";
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticlePreviewComponent } from "./article-preview/article-preview.component";
import { SharedModule } from "../shared/shared.module";
import { Routes } from "@angular/router";

export const blogRoutes: Routes = [
  {
    component: BlogComponent,
    path: "blog/:username",
    children: [
      { path: "preview", component: ArticlePreviewComponent },
      { path: "add", component: ArticleEditComponent },
      { path: "edit/:articleId", component: ArticleEditComponent },
      { path: "article/:articleId", component: ArticleComponent },
      { path: "**", redirectTo: "preview" }
    ]
  }
];

@NgModule({
  declarations: [BlogComponent, ArticleComponent, ArticleEditComponent, ArticlePreviewComponent],
  imports: [CommonModule, SharedModule]
})
export class BlogModule {}
