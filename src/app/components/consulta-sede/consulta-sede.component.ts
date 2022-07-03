import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  //Ng model
  nombre:string="";
  direccion:string="";
  codigoPostal:string="";
  selPais:number = -1; 
  estado:boolean = true;



  //Pais
  paises: Pais[] = []
  sedes:Sede[] = []

  sede :Sede={
    pais:{
      idPais:0
    }
  }
  
  constructor(private paisService:PaisService , private sedeService:SedeService ){
    paisService.listaPais().subscribe(
   (x) => this.paises = x
    );
  }
  consultaSede(){
    
    this.sedeService.ListaSede(this.nombre, this.direccion, this.codigoPostal, this.selPais, this.estado?1:0).subscribe(
     (x) => {
       this.sedes=x.lista;
       alert(x.mensaje);
     }
    );
  }

  ngOnInit(): void {
  }

}
