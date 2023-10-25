import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private valorSubject = new BehaviorSubject<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private nombreSubject = new BehaviorSubject<string>('');
  private apellidoPaternoSubject = new BehaviorSubject<string>('');
  private apellidoMaternoSubject = new BehaviorSubject<string>('');
  private departamentoSubject = new BehaviorSubject<string>('');

  public valor$ = this.valorSubject.asObservable();
  public id$ = this.idSubject.asObservable();
  public nombre$ = this.nombreSubject.asObservable();
  public apellidoPaterno$ = this.apellidoPaternoSubject.asObservable();
  public apellidoMaterno$ = this.apellidoMaternoSubject.asObservable();
  public departamento$ = this.departamentoSubject.asObservable();

  public setValor(nuevoValor: string) {
    this.valorSubject.next(nuevoValor);
  }

  public setId(nuevoId: string) {
    this.idSubject.next(nuevoId);
  }

  public setNombre(nuevoNombre: string) {
    this.nombreSubject.next(nuevoNombre);
  }

  public setApellidoPaterno(nuevoApellidoPaterno: string) {
    this.apellidoPaternoSubject.next(nuevoApellidoPaterno);
  }

  public setApellidoMaterno(nuevoApellidoMaterno: string) {
    this.apellidoMaternoSubject.next(nuevoApellidoMaterno);
  }

  public setDepartamento(nuevoDepartamento: string) {
    this.departamentoSubject.next(nuevoDepartamento);
  }

  public getId() {
    return this.idSubject.getValue();
  }

  public getNombre() {
    return this.nombreSubject.getValue();
  }

  public getApellidoPaterno() {
    return this.apellidoPaternoSubject.getValue();
  }

  public getApellidoMaterno() {
    return this.apellidoMaternoSubject.getValue();
  }

  public getDepartamento() {
    return this.departamentoSubject.getValue();
  }
}
