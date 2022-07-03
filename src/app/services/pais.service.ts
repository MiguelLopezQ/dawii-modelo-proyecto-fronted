import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlPais = AppSettings.API_ENDPOINT+ '/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
 
  constructor(private http:HttpClient) { }


  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }

  listaPaisJoel():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlPais);
  }


}

