import { Component } from "@angular/core";
import { faAddressBook, faCoins } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  public readonly faAddressBook = faAddressBook;
  public readonly faCoins = faCoins;
}
