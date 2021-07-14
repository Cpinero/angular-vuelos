import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { PasajerosServiceService } from '../../services/pasajeros-service.service';
import {PasajerosComponent} from'../pasajeros/pasajeros.component';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = ['Onetaco', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptions1: Observable<string[]> | undefined;
  tipo_vuelo: string = '2';
  touchUi:boolean = false;
  adultos:number = 0;
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  constructor(public dialog: MatDialog,private _ps:PasajerosServiceService) { }

  ngOnInit() {
    if(window.screen.width <= 360){
      this.touchUi = true;
      console.log(this.touchUi)
    }
    this._ps.disparador.subscribe(data =>{
      console.log(data)
      localStorage.setItem("dataPasajeros", JSON.stringify(data));
    })
  }
  openDialog(){
    this.dialog.open(PasajerosComponent,{
      width: '600px',
    });
  }

  autoOrigen(value:string){
    if(value.length >= 3){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(value),
        map(value => this._filter(value)),
      );
    }
  }
  autoDestino(value:string){
    if(value.length >= 3 ){
      this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(value),
        map(value => this._filter(value)),
      );
    }
  }

}
