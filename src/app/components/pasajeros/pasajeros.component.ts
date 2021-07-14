import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PasajerosServiceService } from '../../services/pasajeros-service.service';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.scss']
})
export class PasajerosComponent implements OnInit {

  public tipo_clase:string = "2";
  public adultos:number = 1;
  public ninos:number = 0;
  public bebes:number = 0;
  public numeroPasajeros:any;
  constructor(private _ps:PasajerosServiceService,public dialogRef: MatDialogRef<BuscadorComponent>) {}

  ngOnInit(): void {
    if(localStorage.getItem("dataPasajeros")){
      this.numeroPasajeros = JSON.parse(localStorage.getItem("dataPasajeros")!);
      this.adultos = this.numeroPasajeros.adultos;
      this.ninos = this.numeroPasajeros.ninos;
      this.bebes = this.numeroPasajeros.bebes;
      this.tipo_clase = this.numeroPasajeros.tipo_clase;
    }
  }
  guardarLocal(){
    this._ps.disparador.emit({
      adultos: this.adultos,
      ninos: this.ninos,
      bebes: this.bebes,
      tipo_clase: this.tipo_clase
    });
  }
  sumarPasajeros(pasajero:string){
    switch (pasajero) {
      case 'adultos':
        this.adultos = this.adultos + 1;
        this.guardarLocal();
        break;
      case 'ninos':
        this.ninos = this.ninos + 1;
        this.guardarLocal();
        break;
      case 'bebes':
        this.bebes = this.bebes + 1;
        this.guardarLocal();
        break;
      default:
        break
    }
  }
  restarPasajeros(pasajero:string){
    switch (pasajero){
      case 'adultos':
        if(this.adultos == 1){
          return
        }else{
          this.adultos = this.adultos - 1;
          this.guardarLocal();
        }
      break;
      case 'ninos':
        if(this.ninos == 0){
          return
        }else{
          this.ninos = this.ninos - 1;
          this.guardarLocal();
        }
      break;
      case 'bebes':
        if(this.bebes == 0){
          return
        }else{
          this.bebes = this.bebes - 1;
          this.guardarLocal();
        }
      break;
      default:
      break;
    }
  }
  tipoClase(){
    this.tipo_clase = this.tipo_clase;
    this.guardarLocal()
  }
  cerrarDialog(){
    this.dialogRef.close();
  }

}
