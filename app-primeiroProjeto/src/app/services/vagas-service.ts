import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PedidoVaga } from '../models/pedido-vaga';
import { Observable, TimestampProvider } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  private http = inject(HttpClient)
  private readonly urlBase: string = 'http://localhost:3000/vagas'

  getPedidoVagas(): Observable<PedidoVaga[]>{ //OS DOIS PONTOS DIZ O QUE SERA RETORNADO NESSE METODO
    return this.http.get<PedidoVaga[]>(this.urlBase)
  }
  postPedidoVagas(novoItem: PedidoVaga): Observable<PedidoVaga>{
    return this.http.post<PedidoVaga>(this.urlBase,novoItem,{
      headers: {
        "Content-type": "application/json"
      }
    })
  }
  getPedidoPorId(idParam: string): Observable<PedidoVaga>{
    return this.http.get<PedidoVaga>(this.urlBase + `/${idParam}`)
  }
  putPedidoVagas(novoItem: PedidoVaga, idVaga: string): Observable<PedidoVaga>{
    return this.http.put<PedidoVaga>(this.urlBase + `/${idVaga}`,novoItem,{
      headers: {
        "Content-type" : "application/json"
      }
    })
  }
  deletePedidoVagas(idVagaParaxcluir: string): Observable<PedidoVaga>{
    return this.http.delete<PedidoVaga>(this.urlBase + `/${idVagaParaxcluir}`)
  }
}
