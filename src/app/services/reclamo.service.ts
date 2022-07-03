import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/reclamo';


@Injectable({
  providedIn: 'root'
})

export class ReclamoService {

  constructor(private http:HttpClient) {   }
  
  insertarReclamo(data: Reclamo): Observable<any> {
    return this.http.post(baseUrlReclamo, data);
  }

  listarReclamosPorParametros(descripcion: string, idTipoReclamo: string, idCliente: string, estadoReclamo: number) {
    const params = new HttpParams().set("descripcionReclamo", descripcion).set("idTipoReclamo", idTipoReclamo)
    .set("idCliente", idCliente).set("estadoReclamo", estadoReclamo)

    return this.http.get<any>(baseUrlReclamo + "/parametros", {params})
  }

  listarTipoReclamo(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/listaTipoReclamo")
  }

  listarClientes(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/listaCliente")
  }
}
