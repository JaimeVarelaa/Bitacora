import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  logout() {
    this.authService.logout();
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }
}
