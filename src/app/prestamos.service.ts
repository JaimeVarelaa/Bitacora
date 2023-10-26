import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private valorSubject = new BehaviorSubject<string>('');
  private ID_UsuarioSubject = new BehaviorSubject<string>('');
  private ID_EquipoSubject = new BehaviorSubject<string>('');
  private DadoSubject = new BehaviorSubject<string>('');
  private RecuperadoSubject = new BehaviorSubject<string>('');

  public valor$ = this.valorSubject.asObservable();
  public ID_Usuario$ = this.ID_UsuarioSubject.asObservable();
  public ID_Equipo$ = this.ID_EquipoSubject.asObservable();
  public Dado$ = this.DadoSubject.asObservable();
  public Recuperado$ = this.RecuperadoSubject.asObservable();

  public setValor(nuevoValor: string) {
    this.valorSubject.next(nuevoValor);
  }

  public setIDUsuario(nuevoIDUsuario: string) {
    this.ID_UsuarioSubject.next(nuevoIDUsuario);
  }

  public setIDEquipo(nuevoIDEquipo: string) {
    this.ID_EquipoSubject.next(nuevoIDEquipo);
  }

  public setDado(nuevoDado: string) {
    this.DadoSubject.next(nuevoDado);
  }

  public setRecuperado(nuevoRecuperado: string) {
    this.RecuperadoSubject.next(nuevoRecuperado);
  }

  public getIDUsuario() {
    return this.ID_UsuarioSubject.getValue();
  }

  public getIDEquipo() {
    return this.ID_EquipoSubject.getValue();
  }

  public getDado() {
    return this.DadoSubject.getValue();
  }

  public getRecuperado() {
    return this.RecuperadoSubject.getValue();
  }
}