import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bitacora';
  isLoggedIn = true;

  handleLogin(loginData: any) {
    // Lógica de inicio de sesión aquí
    // Después de iniciar sesión con éxito, cambia el valor de isLoggedIn a verdadero.
    this.isLoggedIn = true;
  }
}
