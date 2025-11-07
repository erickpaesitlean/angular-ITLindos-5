import { Component, signal, WritableSignal } from '@angular/core';
import { GestoresService } from '../../services/gestores-service';
import { Observable } from 'rxjs';
import { Gestores } from '../../models/gestores-vaga';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamentos } from '../../models/departamentos-vaga';

@Component({
  selector: 'app-lista-gestores',
  imports: [],
  templateUrl: './lista-gestores.html',
  styleUrl: './lista-gestores.scss',
})
export class ListaGestores {
  gestoresArray: WritableSignal<Gestores[]> = signal([])
  departamentosArray: WritableSignal<Departamentos[]> = signal([])
  constructor(private serviceGestores: GestoresService, private serviceDepartamentos: DepartamentosService){}

  ngOnInit(){
    this.carregarGestores()
  }
  carregarGestores(): void{
    this.serviceGestores.getGestores().subscribe({
      next: dados =>{
        console.log(dados)
        this.gestoresArray.set(dados)
      },
      error: error =>{
        console.log(error)
      }
    })
  }

  encontrarNomeDep(idDep: string): string{
    this.serviceDepartamentos.getDepartamentos().subscribe({
      next: dados=> {
        console.log(dados)
        this.departamentosArray.set(dados)
      },
      error: error =>{
        console.log(error)
      }
    })

    let nomeDepartamento = this.departamentosArray().find(n=> n.id == idDep)
    if(nomeDepartamento){
      return nomeDepartamento.departamento
    }else{
      return 'Nada'
    }

  }

}
