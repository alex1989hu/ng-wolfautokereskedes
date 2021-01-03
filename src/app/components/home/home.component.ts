import { Component } from "@angular/core";
import {
  faAddressBook,
  faCheck,
  faClock,
  faCoins,
  faExclamationTriangle,
  faIdCard,
  faMapMarkedAlt,
  faPhone,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-home",
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  public readonly faAddressBook = faAddressBook;
  public readonly faCheck = faCheck;
  public readonly faClock = faClock;
  public readonly faCoins = faCoins;
  public readonly faExclamationTriangle = faExclamationTriangle;
  public readonly faIdCard = faIdCard;
  public readonly faMapMarkedAlt = faMapMarkedAlt;
  public readonly faPhone = faPhone;
  public readonly faShoppingCart = faShoppingCart;
}
