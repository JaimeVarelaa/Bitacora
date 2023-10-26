import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private valorSubject = new BehaviorSubject<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private modeloSubject = new BehaviorSubject<string>('');
  private marcaSubject = new BehaviorSubject<string>('');
  private noSerieSubject = new BehaviorSubject<string>('');
  private tipoSubject = new BehaviorSubject<string>('');

  public valor$ = this.valorSubject.asObservable();
  public id$ = this.idSubject.asObservable();
  public modelo$ = this.modeloSubject.asObservable();
  public marca$ = this.marcaSubject.asObservable();
  public noSerie$ = this.noSerieSubject.asObservable();
  public tipo$ = this.tipoSubject.asObservable();

  public setValor(nuevoValor: string) {
    this.valorSubject.next(nuevoValor);
  }

  public setId(nuevoId: string) {
    this.idSubject.next(nuevoId);
  }

  public setModelo(nuevoModelo: string) {
    this.modeloSubject.next(nuevoModelo);
  }

  public setMarca(nuevaMarca: string) {
    this.marcaSubject.next(nuevaMarca);
  }

  public setNoSerie(nuevoNoSerie: string) {
    this.noSerieSubject.next(nuevoNoSerie);
  }

  public setTipo(nuevoTipo: string) {
    this.tipoSubject.next(nuevoTipo);
  }

  public getId() {
    return this.idSubject.getValue();
  }

  public getModelo() {
    return this.modeloSubject.getValue();
  }

  public getMarca() {
    return this.marcaSubject.getValue();
  }

  public getNoSerie() {
    return this.noSerieSubject.getValue();
  }

  public getTipo() {
    return this.tipoSubject.getValue();
  }
}
