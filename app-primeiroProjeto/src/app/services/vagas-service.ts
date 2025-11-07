import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PedidoVaga } from '../models/pedido-vaga';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  private http = inject(HttpClient)
  private readonly urlBase: string = 'http://localhost:3000/vagas/'

  getPedidoVagas(): Observable<PedidoVaga[]>{ //OS DOIS PONTOS DIZ O QUE SERA RETORNADO NESSE METODO
    return this.http.get<PedidoVaga[]>(this.urlBase)
  }

  getPedidoVagasPorId(id: string): Observable<PedidoVaga>{ //OS DOIS PONTOS DIZ O QUE SERA RETORNADO NESSE METODO
    return this.http.get<PedidoVaga>(this.urlBase + id)
  }





}
