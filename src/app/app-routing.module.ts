import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
