import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaginaService } from '../pagina.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario: any = {};
  mostrarFormulario = false;
  mostrarSpinner = false;

  constructor(private http: HttpClient, private pagina: PaginaService, private router: Router) {
    pagina.setValor('usuarios');
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.mostrarOcultarSpinner(true);
    this.http.get<any[]>('https://api-firebase-eight.vercel.app/getUsuarios')
      .subscribe(
        response => {
          this.usuarios = response;
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al obtener los usuarios:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  agregarUsuario(): void {
    this.usuarios.push(this.nuevoUsuario);
    this.enviarUsuarioAPIDB(this.nuevoUsuario);
  }

  enviarUsuarioAPIDB(usuario: any): void {
    this.mostrarOcultarSpinner(true);
    this.http.post('https://api-firebase-eight.vercel.app/postUsuarios', usuario)
      .subscribe(
        response => {
          console.log('Usuario agregado a la base de datos:', response);
          this.router.navigate(['/usuarios']);
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al agregar el usuario a la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  modificarUsuario(usuario: any) {
    this.nuevoUsuario = { ...usuario };
    this.mostrarFormulario = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.nuevoUsuario = {};
  }

  actualizarUsuario() {
    this.mostrarOcultarSpinner(true);
    this.http.put('https://api-firebase-eight.vercel.app/putUsuarios/' + this.nuevoUsuario.id, this.nuevoUsuario)
      .subscribe(
        response => {
          console.log('Usuario actualizado en la base de datos:', response);
          this.nuevoUsuario = {};
          this.mostrarFormulario = false;
          this.obtenerUsuarios();
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al actualizar el usuario en la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  eliminarUsuario(usuario: any) {
    this.mostrarOcultarSpinner(true);
    this.http.delete('https://api-firebase-eight.vercel.app/deleteUsuarios/' + usuario.id)
      .subscribe(
        response => {
          console.log('Usuario eliminado de la base de datos:', response);
          const index = this.usuarios.indexOf(usuario);
          if (index !== -1) {
            this.usuarios.splice(index, 1);
          }
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al eliminar el usuario de la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  mostrarOcultarSpinner(mostrar: boolean) {
    this.mostrarSpinner = mostrar;
  }
}
