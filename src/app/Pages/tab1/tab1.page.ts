import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tareaService: TareasService,
              private router: Router,
              private alert:AlertController) {
    
  }

  async agregarLista(){
    

    const alert1 = await this.alert.create({
      header: 'Nueva Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        },
        {
          text: 'Crear',
          handler: (data) => {
            // console.log(data);
            if (data.titulo.length === 0){
              return;
            }

            const listaId = this.tareaService.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

    alert1.present();
  }

  /*listaSeleccionada(lista: Lista){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }*/
}