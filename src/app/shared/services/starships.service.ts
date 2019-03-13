import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { StarShip } from '../model/StarShip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  BASE_URL:string
  urlString:string

  constructor(private http:HttpClient) { 
    this.BASE_URL='https://swapi.co/api/starships/'
    this.urlString=''
  }

  getStarShips(id:string):Observable<StarShip[]>{
    this.urlString=this.BASE_URL+id+'/'
    return this.http.get<StarShip[]>(this.urlString)
  }
}
