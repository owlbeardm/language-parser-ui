import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {NavLinkComponent} from "./nav-link/nav-link.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.css'],
  imports: [LoginComponent, NavLinkComponent]
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
