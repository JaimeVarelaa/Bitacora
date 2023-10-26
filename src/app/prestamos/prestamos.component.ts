import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrestamosService } from '../prestamos.service';
import { PaginaService } from '../pagina.service';
import { EquiposService } from '../equipos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  prestamos: any[] = [];
  usuarios: any[] = [];
  equipos: any[] = [];
  nuevoPrestamo: any = {};
  mostrarFormulario = false;
  mostrarSpinner = false;
  filtro: string = '';
  filtroE: string = '';
  equiposFiltrados: any[] = [];
  equiposSeleccionado: any = null;
  usuariosFiltrados: any[] = [];
  usuarioSeleccionado: any = null;

  constructor(
    private http: HttpClient,
    private pagina: PaginaService,
    private prestamoService: PrestamosService,
    private equiposService: EquiposService,
    private router: Router
  ) {
    pagina.setValor('usuarios');
    prestamoService.setValor('prestamos');
    equiposService.setValor('equipos');
  }

  ngOnInit(): void {
    this.obtenerPrestamos();
    this.obtenerUsuarios();
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.http.get<any[]>('https://api-firebase-eight.vercel.app/getEquipos')
      .subscribe(
        response => {
          this.equipos = response;
        },
        error => {
          console.log('Error al obtener los equipos:', error);
        }
      );
  }

  filtrarEquipos(): void {
    this.equiposFiltrados = this.equipos.filter(equipo => {
      if (equipo.Ocupado != "1") {
        return (
          equipo.Tipo.toLowerCase().includes(this.filtroE.toLowerCase()) ||
          equipo.Modelo.toLowerCase().includes(this.filtroE.toLowerCase())
        );
      }
    });
  }

  seleccionarEquipo(equipo: any): void {
    this.nuevoPrestamo.IDEquipo = equipo.id;
    this.equiposSeleccionado = equipo;
    this.filtroE = `${equipo.Tipo} ${equipo.Modelo}`;
    this.equiposFiltrados = [];
  }

  nombreEquipo(equipoID: number): string {
    const equipo = this.equipos.find(equipo => equipo.id === equipoID);

    if (equipo) {
      return `${equipo.Tipo} ${equipo.Modelo}`;
    }

    return 'Usuario no encontrado';
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

  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      if (usuario.Ocupado != "1") {
        return (
          usuario.Nombres.toLowerCase().includes(this.filtro.toLowerCase()) ||
          usuario.App.toLowerCase().includes(this.filtro.toLowerCase()) ||
          usuario.Apm.toLowerCase().includes(this.filtro.toLowerCase())
        );
      }
    });
  }

  seleccionarUsuario(usuario: any): void {
    this.nuevoPrestamo.IDUsuario = usuario.id;
    this.usuarioSeleccionado = usuario;
    this.filtro = `${usuario.Nombres} ${usuario.App} ${usuario.Apm}`;
    this.usuariosFiltrados = [];
  }

  nombreUsuario(usuarioID: number): string {
    const usuario = this.usuarios.find(user => user.id === usuarioID);

    if (usuario) {
      return `${usuario.Nombres} ${usuario.App} ${usuario.Apm}`;
    }

    return 'Usuario no encontrado';
  }

  validarNombreUsuario(): boolean {
    const nombreIngresado = this.filtro.trim();
    return this.usuarios.some(usuario =>
      `${usuario.Nombres} ${usuario.App} ${usuario.Apm}` === nombreIngresado
    );
  }



  obtenerPrestamos(): void {
    this.mostrarOcultarSpinner(true);

    this.http.get<any[]>('https://api-firebase-eight.vercel.app/getPrestamos')
      .subscribe(
        response => {
          this.prestamos = response;
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al obtener los prestamos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  agregarPrestamo(): void {
    this.usuarios.push(this.nuevoPrestamo);
    this.enviarPrestamoAPIDB(this.nuevoPrestamo);
  }

  enviarPrestamoAPIDB(prestamo: any): void {
    this.mostrarOcultarSpinner(true);
    const fechaActual = new Date().toISOString();
    const fechaActualFormateada = this.formatDate(fechaActual);
    this.nuevoPrestamo.Dado = fechaActualFormateada;

    this.http.post('https://api-firebase-eight.vercel.app/postPrestamos', prestamo)
      .subscribe(
        response => {
          console.log('Prestamo agregado a la base de datos:', response);
          this.router.navigate(['/prestamos']);
          this.mostrarOcultarSpinner(false);
          this.mostrarFormulario = false;
        },
        error => {
          console.log('Error al agregar el prestamo a la base de datos:', error);
          this.mostrarOcultarSpinner(false);
          this.mostrarFormulario = false;
        }
      );
  }

  modificarPrestamo(prestamo: any) {
    this.nuevoPrestamo = { ...prestamo };
    this.mostrarFormulario = true;
    this.router.navigate(['/prestamos']);
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.nuevoPrestamo = {};
    this.router.navigate(['/prestamos']);
  }

  actualizarPrestamo() {
    this.mostrarOcultarSpinner(true);

    this.http.put('https://api-firebase-eight.vercel.app/putPrestamos/' + this.nuevoPrestamo.id, this.nuevoPrestamo)
      .subscribe(
        response => {
          console.log('Prestamo actualizado en la base de datos:', response);
          this.nuevoPrestamo = {};
          this.mostrarFormulario = false;
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al actualizar el prestamo en la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  eliminarPrestamo(prestamo: any) {
    this.mostrarOcultarSpinner(true);

    this.http.delete('https://api-firebase-eight.vercel.app/deletePrestamos/' + prestamo.id)
      .subscribe(
        response => {
          console.log('Prestamo eliminado de la base de datos:', response);
          const index = this.prestamos.indexOf(prestamo);
          if (index !== -1) {
            this.prestamos.splice(index, 1);
          }
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al eliminar el prestamo de la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  mostrarOcultarSpinner(mostrar: boolean) {
    this.mostrarSpinner = mostrar;
  }

  recibirPrestamo(prestamo: any) {
    this.mostrarOcultarSpinner(true);
    this.nuevoPrestamo.id = prestamo.id;
    const fechaActual = new Date().toISOString();
    const fechaActualFormateada = this.formatDate(fechaActual);
    this.nuevoPrestamo.Recuperado = fechaActualFormateada;
    this.http.put('https://api-firebase-eight.vercel.app/putPrestamos/' + this.nuevoPrestamo.id, this.nuevoPrestamo)
      .subscribe(
        response => {
          console.log('Prestamo actualizado en la base de datos:', response);
          this.nuevoPrestamo = {};
          this.mostrarFormulario = false;
          this.mostrarOcultarSpinner(false);
          this.router.navigate(['/prestamos']);
        },
        error => {
          console.log('Error al actualizar el prestamo en la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
