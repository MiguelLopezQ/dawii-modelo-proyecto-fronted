import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {

  //NG Model
  nombre:string="";
  descripcion:string="";
  certificado:string="";
  selPaises:number=-1;
  estado:boolean=true;

  paises: Pais[]=[]

  marcas: Marca[]=[]

  marca : Marca={
    pais:{
      idPais:0
    }
  }
  
  
  constructor(private paisService: PaisService,private marcaService:MarcaService) {
    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
   }

   consultaMarca(){
     this.marcaService.listaMarcaConParametros(this.nombre,this.descripcion,this.certificado,this.selPaises,this.estado?1:0).subscribe(
       (x) =>{
         this.marcas=x.lista;
         //alert(x.mensaje);
         Swal.fire('Mensaje', x.mensaje,'success');
       }
     );
   }

   

  ngOnInit(): void {
  }


}