import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private cookieService: CookieService) { }

  checkLoginStatus(): void {
    const tokenExists = this.cookieService.check('authToken');
    
    if (tokenExists) {
      this.isLoggedIn = true;
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
