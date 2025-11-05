import { Component, WritableSignal , signal } from '@angular/core';

@Component({
  selector: 'app-lista-vagas',
  imports: [],
  templateUrl: './lista-vagas.html',
  styleUrl: './lista-vagas.scss',
})
export class ListaVagas {
  contador: WritableSignal<number> = signal(0)
  add():void{
    this.contador.update(valorAntigo => valorAntigo + 1)
  }
  nomes: string[] = [
    'Erick',
    'Theo'
  ]
}
