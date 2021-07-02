import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList /** Se puede hacer con ref local*/) listaBo:IonList;

  constructor(public tareaService: TareasService,
              private router: Router,
              private alert:AlertController) { }

  ngOnInit() {}
  

  listaSeleccionada(lista: Lista){

    if (this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    
  }

  borrarLista(lista:Lista){
    this.tareaService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    const alert1 = await this.alert.create({
      header: 'Editar Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.listaBo.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            // console.log(data);
            if (data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
            this.tareaService.guardarStorage();
            this.listaBo.closeSlidingItems();
          }
        }
      ]
    });

    alert1.present();
  }
}
