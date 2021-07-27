import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { PasajerosServiceService } from '../../services/pasajeros-service.service';
import {PasajerosComponent} from '../pasajeros/pasajeros.component';
import { VuelosApiService } from '../../services/vuelos-api.service';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: any[] = [];
  options2: any[] = [];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptions1: Observable<string[]> | undefined;
  tipoVuelo = '2';
  touchUi = false;
  adultos = 0;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  // tslint:disable-next-line: variable-name
  constructor(public dialog: MatDialog,
              private _ps: PasajerosServiceService,
              private _vs: VuelosApiService) { }

  ngOnInit(): void {
    this.getNames();
    if (window.screen.width <= 360){
      this.touchUi = true;
      console.log(this.touchUi);
    }
    this._ps.disparador.subscribe(data => {
      console.log(data);
      localStorage.setItem('dataPasajeros', JSON.stringify(data));
    });
  }
  getNames(){
    this._vs.Vuelosname().subscribe(resp =>{
      this.options = resp
    });

  }
  openDialog(): void{
    this.dialog.open(PasajerosComponent, {
      width: '600px',
    });
  }

  autoOrigen(value: string): void{
    if (value.length >= 3){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(value),
        // tslint:disable-next-line: no-shadowed-variable
        map(value => this._filter(value)),
      );
    }
  }
  autoDestino(value: string): void{
    if (value.length >= 3 ){
      this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(value),
        map(value => this._filter(value)),
      );
    }
  }

}
