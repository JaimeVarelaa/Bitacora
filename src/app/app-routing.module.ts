import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';
import { LoginComponent } from './login/login.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'login', component: LoginComponent},
  {path: 'prestamos', component: PrestamosComponent},
  {path: 'historial', component: HistorialComponent},
  {path: 'default', component: PrestamosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'prestamos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
