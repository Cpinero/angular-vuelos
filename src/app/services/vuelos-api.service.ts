import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VuelosApiService {
  constructor(private http: HttpClient) { }

  Vuelosname(){
    const url = `https://volarbarato.herokuapp.com/flights/airports?country=AR&query=mad`;
    return this.http.get(url).pipe(
      map((response: []) => response.map(item => item['name']))
    )
  }
}
