import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  descripcion: string = ""
  selTipoReclamo: string = "-1"
  selIdCliente: string = "-1"
  estado: boolean = true

  tipoReclamo: TipoReclamo[] = []
  clientes: Cliente[] = []

  reclamos: Reclamo[] = []

  constructor(private tipoReclamoService: TipoReclamoService, private clienteService: ClienteService, private service: ReclamoService) {
    this.tipoReclamoService.listaTipoReclamo().subscribe(x => this.tipoReclamo = x)
    this.clienteService.listaCliente().subscribe(x => this.clientes = x)
  }

  listarReclamos() {
    this.service.listarReclamosPorParametros(this.descripcion, this.selTipoReclamo, this.selIdCliente, this.estado ? 1 : 0)
    .subscribe(x => { 
      this.reclamos = x.data
      alert(x.mensaje)
    })
  }

  ngOnInit(): void {
    this.listarReclamos()
  }

}
