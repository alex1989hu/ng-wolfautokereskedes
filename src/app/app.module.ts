import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent, HomeComponent, FooterComponent],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    ScrollToModule.forRoot()
  ],
  providers: []
})
export class AppModule {}
