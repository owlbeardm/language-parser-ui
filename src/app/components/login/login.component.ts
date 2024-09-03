import {Component, OnInit} from '@angular/core';
import {FireAuthService} from '../../services/fire-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireAuthService: FireAuthService) {
  }

  get loggedIn(): boolean {
    return this.fireAuthService.isLoggedIn;
  }

  get userName(): string {
    const name = this.fireAuthService?.userData?.displayName;
    return name ? name : 'Logged In';
  }

  ngOnInit(): void {
  }

  GoogleAuth(): void {
    this.fireAuthService.GoogleAuth();
  }

  logOut(): void {
    this.fireAuthService.SignOut();
  }
}
