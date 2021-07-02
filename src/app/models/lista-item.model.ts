export class ListaItem {
    descripcion: string;
    completado: boolean;

    constructor(Descripcion: string){
        this.descripcion = Descripcion;
        this.completado = false;
    }
}
