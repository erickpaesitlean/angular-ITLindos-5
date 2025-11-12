import { HttpClient } from '@angular/common/http';
import { inject , Injectable} from '@angular/core';
import { Departamentos } from '../models/departamentos-vaga';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private http = inject(HttpClient)
  private readonly urlBase = 'http://localhost:3000/departamento'

  getDepartamentos():Observable<Departamentos[]>{
    return this.http.get<Departamentos[]>(this.urlBase)
  }
  postDepartamento(novoItem: Departamentos):Observable<Departamentos>{
    return this.http.post<Departamentos>(this.urlBase,novoItem,{
      headers: {
        "Content-type": "json/application"
      }
    })
  }
  deletarDepartamento(idDept: string): Observable<Departamentos>{
    return this.http.delete<Departamentos>(this.urlBase + `/${idDept}`)
  }
}
