import packageJson from '../../package.json';
import { Component } from '@angular/core';
import {FooterComponent} from "./components/footer/footer.component";
import {VersionFooterComponent} from "./components/version-footer/version-footer.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [VersionFooterComponent, FooterComponent, RouterOutlet, HeaderComponent]
})
export class AppComponent {
  title = 'language-parser-ui';
  public version: string = packageJson.version;
}
