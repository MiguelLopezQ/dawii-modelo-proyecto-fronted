import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {

  marcas: Marca[]=[];
  filtro: string="";
  paises: Pais[]=[];;

  marca: Marca={
    idMarca:0,
    nombre:"",
    descripcion:"",
    certificado:"",
    estado:1,
    pais:{
      idPais:-1,
      nombre:"-1",
    }
  };

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zó ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Zó  ]{3,30}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]{9}')]),
    validaFecha: new FormControl('', [Validators.required]),
    
});


  formsActualiza = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zó ]{3,30}')]),
  validaDescripcion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Zó  ]{3,30}')]),
  validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]{9}')]),
  validaFecha: new FormControl('', [Validators.required]),
  validaPais: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

submitted = false;

  constructor(private marcaService:MarcaService,private paisService:PaisService) {
    this.paisService.listaPais().subscribe(
      response => this.paises = response
    );
   }
   cargaPais(){
    this.paisService.listaPais().subscribe(
      response => this.paises=response
    );
    this.marca!.pais!.idPais=-1;
   }

  ngOnInit(): void {
  }

  consulta(){
    this.marcaService.listaMarca2(this.filtro==""?"todos":this.filtro).subscribe(
      (x) => this.marcas = x
    );
  }

  actualizaEstado(aux : Marca){
    aux.estado = aux.estado == 0? 1 :0;
    this.marcaService.actualizaMarca(aux).subscribe();
  }

  registra(){
    this.submitted = true;

     //finaliza el método si hay un error
     if (this.formsRegistra.invalid){
      return;
     }
     
     this.submitted = false;

     this.marcaService.registraMarca(this.marca).subscribe(
           (x) => {
             document.getElementById("btn_reg_cerrar")?.click()
             //alert(x.mensaje);
             Swal.fire('Mensaje', x.mensaje,'success');
             this.marcaService.listaMarca2(this.filtro==""?"todos":this.filtro).subscribe(
                     (x) => this.marcas = x
             );
           } 
     );

     //limpiar los componentes del formulario a través de los ngModel
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

  buscar(aux : Marca){
    this.marca = aux;

    this.paisService.listaPais().subscribe(
      response => this.paises=response
    );

  }

  actualiza(){
    this.submitted = true;

    //finaliza el método si hay un error
    if (this.formsActualiza.invalid){
     return;
    }

    this.submitted = false;

    this.marcaService.actualizaMarca(this.marca).subscribe(
          (x) => {
            document.getElementById("btn_act_cerrar")?.click()
            //alert(x.mensaje);
            Swal.fire('Mensaje', x.mensaje,'success');
            this.marcaService.listaMarca2(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.marcas = x
            );
          } 
    );

  
   //limpiar los comobobox
   

   //limpiar los componentes del formulario a través de los ngModel
    this.marca={
      idMarca:0,
      nombre:"",
      descripcion:"",
      certificado:"",
      estado:1,
      pais:{
        idPais:-1,
        nombre:"-1"
      }
    }
}
elimina(aux :Marca){
    Swal.fire({
    title: '¿Estas Seguro?',
    text: "¡Nose puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.marcaService.eliminaMarca(aux.idMarca).subscribe(

        (x) => {
          //alert(x.mensaje);
          Swal.fire('Mensaje', x.mensaje,'success');
          this.marcaService.listaMarca2(this.filtro==""?"todos":this.filtro).subscribe(
    
                  (x) => this.marcas = x
    
          );
    
        } 
    
      );
      
      
    }

  })
}

}
