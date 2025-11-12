import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gestores } from '../models/gestores-vaga';

@Injectable({
  providedIn: 'root',
})
export class GestoresService {
  private http = inject(HttpClient)
  private readonly urlBase = "http://localhost:3000/gestor"
  
  getGestores(): Observable<Gestores[]>{
    return this.http.get<Gestores[]>(this.urlBase)
  }
  postGestores(novoItem: Gestores): Observable<Gestores>{
    return this.http.post<Gestores>(this.urlBase,novoItem,{
      headers: {
        "Content-type": "application/json"
      }
    })
  }
  deleteGestores(idGestor: string): Observable<Gestores>{
    return this.http.delete<Gestores>(this.urlBase + `/${idGestor}`)
  }
}
