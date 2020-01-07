import { Component } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <app-home></app-home>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  constructor(private readonly meta: Meta) {
    this.meta.addTags([
      { name: "author", content: environment.authorName },
      { name: "linkedin", content: environment.authorUrl },
      { name: "source", content: environment.sourceCodeUrl },
      { name: "Robots", content: "all" },
      { name: "Googlebot", content: "all" }
    ]);
  }
}
