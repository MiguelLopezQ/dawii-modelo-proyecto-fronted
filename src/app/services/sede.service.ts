import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Sede } from '../models/sede.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';
const baseUrlSedePC3 = 'http://localhost:8090/rest/crudSede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  ListaSede(nombre:string, direccion:string, codigoPostal:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("direccion", direccion).set("codigoPostal", codigoPostal).set("idPais", idPais).set("estado", estado);  
    return this.http.get<any>(baseUrlSede + "/listaPorParametros", {params});
 }
 listaSede(filtro:string):Observable<Sede[]> {
  return this.http.get<Sede[]>(baseUrlSedePC3 + "/listaSedePorNombreLike/"+ filtro);
}  

registraSede(obj: Sede): Observable<any>{
  return this.http.post(baseUrlSedePC3+ "/registraSede", obj);
}

actualizaSede(obj: Sede): Observable<any>{
return this.http.put(baseUrlSedePC3 + "/actualizaSede", obj);
}
eliminaSede(id: any): Observable<any>{
  return this.http.delete(baseUrlSedePC3 + "/eliminaSede/" + id);
}

}
