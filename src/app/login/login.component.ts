import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();

  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private cookieService: CookieService) { }

  verificarUsuario() {
    if (this.username === 'admin' && this.password === 'admin') {
      const token = 'ensesion';
      this.cookieService.set('authToken', token);
      this.loginEvent.emit(true);
    } else {
      this.username = '';
      this.password = '';
      this.loginFailed = true;

      setTimeout(() => {
        this.loginFailed = false;
      }, 1000);
    }
  }
}
