import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EquiposService } from '../equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos: any[] = [];
  nuevoEquipo: any = {};
  mostrarFormulario = false;
  mostrarSpinner = false;

  constructor(private http: HttpClient, private equiposService: EquiposService, private router: Router) {
    equiposService.setValor('equipos');
  }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.mostrarOcultarSpinner(true);

    this.http.get<any[]>('https://api-firebase-eight.vercel.app/getEquipos')
      .subscribe(
        response => {
          this.equipos = response;
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al obtener los equipos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  agregarEquipo(): void {
    this.equipos.push(this.nuevoEquipo);
    this.enviarUsuarioAPIDB(this.nuevoEquipo);
  }

  enviarUsuarioAPIDB(usuario: any): void {
    this.mostrarOcultarSpinner(true);
    this.http.post('https://api-firebase-eight.vercel.app/postEquipos', usuario)
      .subscribe(
        response => {
          console.log('Equipo agregado a la base de datos:', response);
          this.router.navigate(['/equipos']);
          this.mostrarOcultarSpinner(false);
          this.mostrarFormulario = false;
        },
        error => {
          console.log('Error al agregar el Equipo a la base de datos:', error);
          this.mostrarOcultarSpinner(false);
          this.mostrarFormulario = false;
        }
      );
  }

  modificarEquipo(equipo: any) {
    this.nuevoEquipo = { ...equipo };
    this.mostrarFormulario = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.nuevoEquipo = {};
  }

  actualizarEquipo() {
    this.mostrarOcultarSpinner(true);

    this.http.put('https://api-firebase-eight.vercel.app/putEquipos/' + this.nuevoEquipo.id, this.nuevoEquipo)
      .subscribe(
        response => {
          console.log('Equipo actualizado en la base de datos:', response);
          this.nuevoEquipo = {};
          this.mostrarFormulario = false;
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al actualizar el equipo en la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  eliminarEquipo(equipo: any) {
    this.mostrarOcultarSpinner(true);

    this.http.delete('https://api-firebase-eight.vercel.app/deleteEquipos/' + equipo.id)
      .subscribe(
        response => {
          console.log('Equipo eliminado de la base de datos:', response);
          const index = this.equipos.indexOf(equipo);
          if (index !== -1) {
            this.equipos.splice(index, 1);
          }
          this.mostrarOcultarSpinner(false);
        },
        error => {
          console.log('Error al eliminar el equipo de la base de datos:', error);
          this.mostrarOcultarSpinner(false);
        }
      );
  }

  mostrarOcultarSpinner(mostrar: boolean) {
    this.mostrarSpinner = mostrar;
  }
}
