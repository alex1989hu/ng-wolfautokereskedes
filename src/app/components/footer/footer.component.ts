import { Component } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html"
})
export class FooterComponent {
  public readonly authorName: string;
  public readonly authorUrl: string;
  public readonly faUtensils = faUtensils;
  public readonly faCar = faCar;
  public readonly faGithub = faGithub;
  public readonly sourceCodeUrl: string;

  constructor() {
    this.authorName = environment.authorName;
    this.authorUrl = environment.authorUrl;
    this.sourceCodeUrl = environment.sourceCodeUrl;
  }
}
