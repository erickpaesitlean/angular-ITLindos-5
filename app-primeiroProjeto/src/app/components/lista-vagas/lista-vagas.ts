import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { VagasService } from '../../services/vagas-service';
import { PedidoVaga } from '../../models/pedido-vaga';
import { GestoresService } from '../../services/gestores-service';
import { Gestores } from '../../models/gestores-vaga';
import { RouterLink} from "@angular/router";
@Component({
  selector: 'app-lista-vagas',
  imports: [RouterLink],
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
  gestores: WritableSignal<Gestores[]> = signal([])

  vagaSelecionadaId? : PedidoVaga

  constructor(private vagasService: VagasService, private gestoresService: GestoresService){}

  ngOnInit(): void {
    this.carregarPedidos()
    this.carregarGestores()
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


  // carregarPedidoPeloId(id: string):void{
  //   this.vagasService.getPedidoVagasPorId(id).subscribe({
  //     next: data =>{
  //       this.vagaSelecionadaId = data
  //       console.log(this.vagaSelecionadaId)
  //     },
  //     error: error => console.log(error)
  //   })
  // }

  converteData(iso: string): string{
    let d = new Date(iso)
    return d.toLocaleDateString('pt-br')
  }

  carregarGestores(): void{
    this.gestoresService.getGestores().subscribe({
      next: dados =>{
        console.log(dados)
        this.gestores.set(dados)
      },
      error: error=>{
        console.log(error)
      }
    })
  }

  excluirVaga(idVagaParaxcluir: string):void{
    this.vagasService.deletePedidoVagas(idVagaParaxcluir).subscribe({
      next: vagaDeletada => {
        alert('Vaga Deletada')
        this.carregarPedidos()
      },
      error: erro => console.log(erro)
    })
  }

}
