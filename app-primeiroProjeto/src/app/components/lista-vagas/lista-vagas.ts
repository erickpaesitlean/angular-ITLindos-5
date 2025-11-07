import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { VagasService } from '../../services/vagas-service';
import { PedidoVaga } from '../../models/pedido-vaga';

@Component({
  selector: 'app-lista-vagas',
  imports: [],
  templateUrl: './lista-vagas.html',
  styleUrl: './lista-vagas.scss',
})
export class ListaVagas implements OnInit {

  // contador: WritableSignal<number> = signal(0)
  //   nomes: string[] = [
  //   'Erick',
  //   'Theo'
  // ]

   // add():void{
  //   this.contador.update(valorAntigo => valorAntigo + 1)
  // }

  pedidoVagas: WritableSignal<PedidoVaga[]> = signal([])

  vagaSelecionada: WritableSignal<PedidoVaga | null> = signal(null)
  vagaSelecionadaId? : PedidoVaga

  constructor(private vagasService: VagasService){}

  ngOnInit(): void {
    this.carregarPedidos()
  }

 
  carregarPedidos():void{
    this.vagasService.getPedidoVagas().subscribe({
      next: data =>{
        console.log(data)
        this.pedidoVagas.set(data)
      },
      error: error =>{
        console.log(error)
      }
    })
  }


  carregarPedidoPeloId(id: string):void{
    this.vagasService.getPedidoVagasPorId(id).subscribe({
      next: data =>{
        this.vagaSelecionadaId = data
        console.log(this.vagaSelecionadaId)
      },
      error: error => console.log(error)
    })
  }




}
