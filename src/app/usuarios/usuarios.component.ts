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

  constructor(private http: HttpClient, private pagina: PaginaService, private router: Router) {
    pagina.setValor('usuarios');
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.http.get<any[]>('https://api-firebase-eight.vercel.app/getUsuarios')
      .subscribe(
        response => {
          this.usuarios = response;
        },
        error => {
          console.log('Error al obtener los usuarios:', error);
        }
      );
  }

  agregarUsuario(): void {
    this.usuarios.push(this.nuevoUsuario);
    this.enviarUsuarioAPIDB(this.nuevoUsuario);
  }

  enviarUsuarioAPIDB(usuario: any): void {
    this.http.post('https://api-firebase-eight.vercel.app/postUsuarios', usuario)
      .subscribe(
        response => {
          console.log('Usuario agregado a la base de datos:', response);
          this.router.navigate(['/usuarios']);
        },
        error => {
          console.log('Error al agregar el usuario a la base de datos:', error);
        }
      );
  }

  modificarUsuario(usuario: any) {
    this.nuevoUsuario = { ...usuario };
    this.mostrarFormulario = true;
  }

  actualizarUsuario() {
    this.http.put('https://api-firebase-eight.vercel.app/putUsuarios/' + this.nuevoUsuario.id, this.nuevoUsuario)
      .subscribe(
        response => {
          console.log('Usuario actualizado en la base de datos:', response);
          this.nuevoUsuario = {};
          this.mostrarFormulario = false;
          this.obtenerUsuarios();
        },
        error => {
          console.log('Error al actualizar el usuario en la base de datos:', error);
        }
      );
  }

  eliminarUsuario(usuario: any) {
    this.http.delete('https://api-firebase-eight.vercel.app/deleteUsuarios/' + usuario.id)
      .subscribe(
        response => {
          console.log('Usuario eliminado de la base de datos:', response);
          const index = this.usuarios.indexOf(usuario);
          if (index !== -1) {
            this.usuarios.splice(index, 1);
          }
        },
        error => {
          console.log('Error al eliminar el usuario de la base de datos:', error);
        }
      );
  }
}
