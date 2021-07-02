import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  
  lista: Lista;
  nombreItem:string = '';

  constructor(private tareaService:TareasService,
              private router:ActivatedRoute) {
    
    const listaId = this.router.snapshot.paramMap.get('listaId');

    this.lista = this.tareaService.cargarLista(listaId);
  
  }

  ngOnInit() {
  }

  agregarItem(){
    if (this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';

    this.tareaService.guardarStorage();
  }

  cambioCheck(item:ListaItem){

    const pendientes = this.lista.items
                            .filter(itemData => !itemData.completado )
                            .length;

    if (pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    
    this.tareaService.guardarStorage();
  }

  borrarItem(i:number){
    this.lista.items.splice(i, 1);

    this.tareaService.guardarStorage();
  }
}
