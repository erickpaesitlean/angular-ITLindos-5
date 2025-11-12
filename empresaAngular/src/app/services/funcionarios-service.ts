import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  private http = inject(HttpClient)
  private readonly urlBase = 'http://localhost:3000/funcionarios'
  getFuncionarios():Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.urlBase)
  }
  deleteFuncionario(idFuncionario:string):Observable<Funcionario>{
    return this.http.delete<Funcionario>(this.urlBase + `/${idFuncionario}`)
  }
  postFuncionario(funcParaAdd: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(this.urlBase,funcParaAdd,{
      headers: {
        "Content-type": "application/json"
      }
    })
  }
}
