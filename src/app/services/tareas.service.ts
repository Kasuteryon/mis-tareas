import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  listas: Lista[] = [];

  constructor() { 

    this.cargarStorage();

  }

  crearLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return  nuevaLista.id;
  }

  cargarLista(id:string | number){
    id = Number(id);

    return this.listas.find(listaData => listaData.id === id);
  }

  borrarLista(lista:Lista){
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);

    this.guardarStorage();
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage(){
    if (localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else{
      // Aunque esta vaina de mas
      this.listas = [];
    }

  }

}
