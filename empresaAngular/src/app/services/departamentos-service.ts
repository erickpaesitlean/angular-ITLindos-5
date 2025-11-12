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
  getDepartamentos(): Observable<Departamento[]> {
    return this.htpp.get<Departamento[]>(this.urbBase)
  }
  getDepartamentoPorID(idFunc: string): Observable<Departamento> {
    return this.htpp.get<Departamento>(this.urbBase + `/${idFunc}`)
  }
  deleteDepartamento(idDepartamento: string): Observable<Departamento> {
    return this.htpp.delete<Departamento>(this.urbBase + `/${idDepartamento}`)
  }
  postDepartamento(DeptParaAdd: Departamento): Observable<Departamento> {
    return this.htpp.post<Departamento>(this.urbBase, DeptParaAdd, {
      headers: {
        "Content-type": "application/json"
      }
    })
  }
  putDepartamento(DeptParaEdit: Departamento, idFunc: string): Observable<Departamento> {
    return this.htpp.put<Departamento>(this.urbBase + `/${idFunc}`, DeptParaEdit, {
      headers: {
        "Content-type": "application/json"
      }
    })
  }
}
