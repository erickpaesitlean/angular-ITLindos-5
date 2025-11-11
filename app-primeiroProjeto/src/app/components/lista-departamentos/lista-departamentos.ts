import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamentos } from '../../models/departamentos-vaga';

@Component({
  selector: 'app-lista-departamentos',
  imports: [FormsModule],
  templateUrl: './lista-departamentos.html',
  styleUrl: './lista-departamentos.scss',
})
export class ListaDepartamentos implements OnInit {

  constructor(private serviceDepartamento: DepartamentosService){}
  ngOnInit(): void {
    this.carregarDepartamentos()
  }
  arrayDepartamentos: WritableSignal<Departamentos[]> = signal([])
  nomeCategoria:string = ''
    carregarDepartamentos(): void {
    this.serviceDepartamento.getDepartamentos().subscribe({
      next: dados => {
        console.log(dados)
        this.arrayDepartamentos.set(dados)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  criarDepartamento():void{
    let objParaEnviar : Departamentos = {
      departamento: this.nomeCategoria
    }
    this.serviceDepartamento.postDepartamento(objParaEnviar).subscribe({
      next: dados=> {
        alert('Departamento criado')
        this.carregarDepartamentos()
      },
      error: erro => console.log(erro)
    })
  }

}
