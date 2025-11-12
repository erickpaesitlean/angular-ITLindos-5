import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private htpp = inject(HttpClient)
  private readonly urbBase = 'http://localhost:3000/departamentos'
  getDepartamentos():Observable<Departamento[]>{
    return this.htpp.get<Departamento[]>(this.urbBase)
  }
}
