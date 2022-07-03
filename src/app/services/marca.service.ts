import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';
import { Ubigeo } from '../models/ubigeo.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlMarca = AppSettings.API_ENDPOINT+ '/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http: HttpClient) {  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlUtil + '/listaMarca');
  }

  listaMarcaJoel(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca);
  }

  listarDepartamento(): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaDepartamentos");
  }

  listaProvincias(paramDep:any): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaProvincias/"+paramDep);
  }

  listaDistritos(paramDep:any,paramProv:any): Observable<Ubigeo[]>{
    return this.http.get<Ubigeo[]>(baseUrlMarca+"/listaDistritos/"+paramDep+"/"+paramProv);
  }
  insertaMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca,data);
  }
  listaMarcaConParametros(nombre:string,descripcion:string,certificado:string,idPais:number,estado:number): Observable<any>{
    const params=new HttpParams().set("nombre",nombre).set("descripcion",descripcion).set("certificado",certificado).set("idPais",idPais).set("estado",estado);
    return this.http.get<any>(baseUrlMarca+"/listaMarcaConParametros",{params});

  }


  listaMarca2(filtro:string):Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca + "/listaMarcaPorNombreLike/"+ filtro);
}  
  registraMarca(obj: Marca): Observable<any>{
    return this.http.post(baseUrlMarca+ "/registraMarca", obj);
}
  actualizaMarca(obj: Marca): Observable<any>{
  return this.http.put(baseUrlMarca + "/actualizaMarca", obj);
}
  eliminaMarca(id: any): Observable<any>{
  return this.http.delete(baseUrlMarca + "/eliminaMarca/" + id);
}

}
