import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bitacora';
  isLoggedIn = false;

  @Output() loginSuccess = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkLoginStatus();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  handleLogin(success: boolean) {if (success) {
      this.isLoggedIn = true;
    }
  }
}
