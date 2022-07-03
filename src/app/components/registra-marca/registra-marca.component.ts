import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  pais : Pais[]=[]
  marca : Marca={
    pais:{
      idPais:0
    }
  }
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zó ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Zó  ]{3,30}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]{9}')]),
    validaFecha: new FormControl('', [Validators.required]),
  });
  submitted = false;
  constructor(private paisService:PaisService,private marcaService:MarcaService) {
    this.paisService.listaPais().subscribe(
      (x) => this.pais=x
    );
   }

   insertado(){
      this.submitted = true;

     //finaliza el método si hay un error
     if (this.formsRegistra.invalid){
      return;
     }
     
      this.submitted = false;

     this.marcaService.insertaMarca(this.marca).subscribe(
       response =>{
         //alert(response.mensaje);
         Swal.fire('Mensaje', response.mensaje,'info');
       },
       error=>{
         alert(error);
       }
     );
     this.marca={
      idMarca:0,
      nombre:"",
      descripcion:"",
      certificado:"",
      estado:1,
      pais:{
        idPais:-1,
        nombre:"-1",
      }
    }
   }

  ngOnInit(): void {
  }

}
