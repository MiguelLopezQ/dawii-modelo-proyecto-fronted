import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

 //Para la Grilla
 proveedores: Proveedor [] = [];
 filtro: string ="";

 //Para el ubigeo
 departamentos: string[] = [];;
 provincias: string[] = [];;
 distritos: Ubigeo[] = [];;

 
//Json para registrar o actualizar
proveedor: Proveedor = { 
  idProveedor:0,
  razonsocial:"",
  ruc:"",
  direccion:"",
  telefono:"",
  celular:"",
  contacto:"",
  estado:1,
  ubigeo:{
    idUbigeo: 0,
    departamento:"-1",
    provincia:"-1",
    distrito:"-1",
  }
};

//Declaracion de validaciones
formsRegistra = new FormGroup({
  validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaRuc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{7}')]),
  validaCelular: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
  validaContacto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
  validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaRuc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{7}')]),
  validaCelular: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
  validaContacto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

//para verificar que e pulsó el boton
submitted = false;

constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
    this.ubigeoService.listarDepartamento().subscribe(
        response => this.departamentos = response
    );            
}

cargaProvincia(){
    this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
      response =>  this.provincias= response
    );
}

cargaDistrito(){
  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    response =>  this.distritos= response
   );
 }

ngOnInit(): void {
}

 consultaProveedor(){
  this.proveedorService.listaProveedorPC3(this.filtro==""?"todos":this.filtro).subscribe(
     (x) => this.proveedores = x


  );
}

registra(){
  this.submitted = true;

      //finaliza el método si hay un error
      if (this.formsRegistra.invalid){
        return;
      }
      console.log(this.proveedor)
      this.submitted = false;

  this.proveedorService.registraProveedor(this.proveedor).subscribe(
       (x) => {
      document.getElementById("btn_reg_cerrar")?.click();
      Swal.fire('Mensaje', x.mensaje,'success');
      this.proveedorService.listaProveedorPC3(this.filtro==""?"todos":this.filtro).subscribe(
      (x) => this.proveedores = x

      );
    }
  );

   //limpiar los comobobox
   this.distritos = [];
   this.provincias = [];

   //limpiar los componentes del formulario a través de los ngModel

   this.proveedor = { 
         idProveedor:0,
         razonsocial:"",
         direccion:"",
         telefono:"",
         celular:"",
         contacto:"",
         estado:1,
         ubigeo:{
           idUbigeo: -1,
           departamento:"-1",
           provincia:"-1",
           distrito:"-1",
         }
   }
}

busca(aux: Proveedor){
  this.proveedor = aux;

  this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
    response =>  this.provincias= response
  );

  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    response =>  this.distritos= response
   );

}

cambioEstado(aux :Proveedor){
  aux.estado = aux.estado==1?0:1;
  this.proveedorService.actualizaProveedor(aux).subscribe();


}

actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.proveedorService.actualizaProveedor(this.proveedor).subscribe(
       (x) => {
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'success');
        this.consultaProveedor();
       }

  );

   //limpiar los comobobox
   this.distritos = [];
   this.provincias = [];

   //limpiar los componentes del formulario a través de los ngModel

   this.proveedor = { 
         idProveedor:0,
         razonsocial:"",
         direccion:"",
         telefono:"",
         celular:"",
         contacto:"",
         estado:1,
         ubigeo:{
           idUbigeo: -1,
           departamento:"-1",
           provincia:"-1",
           distrito:"-1",
         }
   }

}

elimina(aux:Proveedor){
  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¡No se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Elimínalo'
}).then((result) => {
  if (result.isConfirmed){
    this.proveedorService.eliminaProveedor(aux.idProveedor).subscribe(
      (x)=>{
      Swal.fire('Mensaje', x.mensaje,'success');
      this.proveedorService.listaProveedorPC3(this.filtro==""?"todos":this.filtro).subscribe(
      (x) => this.proveedores = x  
    );
    });
  }
})
     
}


}
