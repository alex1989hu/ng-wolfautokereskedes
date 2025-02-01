import { Component } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { environment } from "../../../environments/environment";
import { gitVersion } from "../../../environments/git-version";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  standalone: false,
})
export class FooterComponent {
  public readonly authorName: string;
  public readonly authorUrl: string;
  public readonly faUtensils = faUtensils;
  public readonly faCar = faCar;
  public readonly faGithub = faGithub;
  public readonly gitRevision: string;
  public readonly sourceCodeUrl: string;

  constructor() {
    this.authorName = environment.authorName;
    this.authorUrl = environment.authorUrl;
    this.gitRevision = gitVersion.commit;
    this.sourceCodeUrl = environment.sourceCodeUrl;
  }
}
