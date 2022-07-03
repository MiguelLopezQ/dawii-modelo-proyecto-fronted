import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = 'http://localhost:8090/url/util';
const baseUrlProveedor = 'http://localhost:8090/url/proveedor';
const baseUrlProveedorPC3 = 'http://localhost:8090/rest/crudProveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  //PC1-REGISTRO PROVEEDOR
  
  registrar(data:Proveedor): Observable<any>{
    return this.http.post(baseUrlProveedor, data);

  }

  //PC2-CONSULTA PROVEEDOR
  listaProveedor(razonsocial:string, ruc:string, idUbigeo:number, estado:number):Observable<any> {
    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("idUbigeo", idUbigeo).set("estado", estado);  
    return this.http.get<any>(baseUrlProveedor + "/listaProveedorConParametros", {params});
 }

  //PC3-CRUD PROVEEDOR
   listaProveedorPC3(filtro : any): Observable<any>{
   return this.http.get<Proveedor[]>(baseUrlProveedorPC3 + '/listaProveedorPorRazonSocialLike/' + filtro);
   }

   registraProveedor(proveedor: Proveedor):Observable<any>{
   return this.http.post(baseUrlProveedorPC3 + '/registraProveedor',proveedor);
   }

   actualizaProveedor(proveedor: Proveedor):Observable<any>{
   return this.http.put(baseUrlProveedorPC3 + '/actualizaProveedor',proveedor);
   }

   eliminaProveedor(id: any):Observable<any>{
   return this.http.delete(baseUrlProveedorPC3 + '/eliminaProveedor/' + id);
   }

  
}
