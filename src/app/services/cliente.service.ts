import { HttpClient } from '@angular/common/http';
import{ HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlCliente = AppSettings.API_ENDPOINT+ '/cliente';
const baseUrlCrudCliente = AppSettings.API_ENDPOINT+ '/crudcliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
constructor(private http :HttpClient) { }

  listaCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlCliente);
  }
  registrar(data:Cliente): Observable<any>{
    return this.http.post(baseUrlCliente, data);
  }
  ConsultaCliente(nombre:string, dni:string, idUbigeo: number,estado:boolean ) : Observable<any>{
    const params = new HttpParams().set("nombre",nombre).set("dni",dni).set("idUbigeo",idUbigeo).set("estado",estado);
    return this.http.get<any>( baseUrlCliente + "/ConsultaCliente", {params});
  }
  listaClienteCrud(filtro:string):Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlCrudCliente + "/listaPoNombre/"+ filtro);
  }  
  registraClienteCrud(obj:  Cliente): Observable<any>{
    return this.http.post(baseUrlCrudCliente+ "/registraCliente", obj);
  }

  actualizaClienteCrud(obj: Cliente): Observable<any>{
  return this.http.put(baseUrlCrudCliente + "/actualizaCliente", obj);
  }

  eliminaClienteCrud(id: any): Observable<any>{
  return this.http.delete(baseUrlCrudCliente + "/eliminaCliente/" + id);
  }



  
}
