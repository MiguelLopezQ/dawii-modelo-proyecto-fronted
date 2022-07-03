import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {

  pais : Pais[] = [];
  marca : Marca[] = [];

  producto : Producto = {
    pais: {
      idPais:-1 
    },
    marca: {
      idMarca:-1,
      pais: {
        idPais:-1 
      }
    }    
  }

  constructor(private paisService:PaisService, private marcaService:MarcaService, private productoService:ProductoService) {
    this.paisService.listaPaisJoel().subscribe(
      (x) => this.pais = x);

    this.marcaService.listaMarcaJoel().subscribe(
        (x) => this.marca = x);

   }

   registraProducto(){    
    this.productoService.registrarProducto(this.producto).subscribe(
        response => {
            console.log(response.mensaje);
            alert(response.mensaje);
          },
          error => {
            console.log(error);
          },
    )
  }



  ngOnInit(): void {
  }




}
