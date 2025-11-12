import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios-service';
import { Funcionario } from '../../models/funcionario';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamento } from '../../models/departamento';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionarios-lista',
  imports: [RouterLink,FormsModule],
  templateUrl: './funcionarios-lista.html',
  styleUrl: './funcionarios-lista.scss',
})
export class FuncionariosLista implements OnInit {
  constructor(private serviceFuncionarios: FuncionariosService, private serviceDepartamentos: DepartamentosService){}
  funcionariosData: WritableSignal<Funcionario[]> = signal([])
  departamentosData: WritableSignal<Departamento[]> = signal([])
  ngOnInit(): void {
    this.carregarFuncionarios()
    this.carregaDepartamentos()
  }

  carregarFuncionarios():void{
    this.serviceFuncionarios.getFuncionarios().subscribe({
      next: respostaReq => {
        console.log(respostaReq)
        this.funcionariosData.set(respostaReq)
      }
    })
  }
  carregaDepartamentos():void{
    this.serviceDepartamentos.getDepartamentos().subscribe({
      next: respostaReq => {
        console.log(respostaReq)
        this.departamentosData.set(respostaReq)
      },
      error: erro => console.log(erro)
    })
  }
  deletarFuncionario(idFuncionario: string):void{
    this.serviceFuncionarios.deleteFuncionario(idFuncionario).subscribe({
      next: funcionarioDeletado => {
        alert(`Funcionário: ${funcionarioDeletado.nome} Deletado!`)
        this.carregarFuncionarios()
      },
      error: erro => console.log(erro)
    })
  }


}
