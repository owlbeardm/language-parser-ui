import packageJson from '../../package.json';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'language-parser-ui';
  public version: string = packageJson.version;
}
