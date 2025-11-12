import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DepartamentosService } from '../../services/departamentos-service';
import { single } from 'rxjs';
import { Departamento } from '../../models/departamento';
import { Funcionario } from '../../models/funcionario';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-departamentos',
  imports: [RouterLink],
  templateUrl: './departamentos.html',
  styleUrl: './departamentos.scss',
})
export class Departamentos implements OnInit {
  constructor(private serviceDepartamentos: DepartamentosService,private rota: ActivatedRoute) { }
  ngOnInit(): void {
    this.carregaDepartamentos()
  }
  departamentosData: WritableSignal<Departamento[]> = signal([])

  objParaEnviar: Departamento = {
    nome: '',
    local: ''
  }

  carregaDepartamentos(): void {
    this.serviceDepartamentos.getDepartamentos().subscribe({
      next: respostaReq => {
        console.log(respostaReq)
        this.departamentosData.set(respostaReq)
      },
      error: erro => console.log(erro)
    })
  }
  deletarDepartamento(idFuncionario: string): void {
    this.serviceDepartamentos.deleteDepartamento(idFuncionario).subscribe({
      next: funcionarioDeletado => {
        alert(`Funcionário: ${funcionarioDeletado.nome} Deletado!`)
        this.carregaDepartamentos()
      },
      error: erro => console.log(erro)
    })
  }

  titulo: string = ''
  formCriar: boolean = false

    postOuPut(): void {
    let param = this.rota.snapshot.paramMap.get('id')
    if (param == 'novoFunc') {
      this.titulo = 'Criar Funcionário'
      this.formCriar = true
    } else {
      this.titulo = 'Editar Funcionário'
      this.serviceDepartamentos.getDepartamentoPorID(param!).subscribe({
        next: getFuncPorId =>{
          this.objParaEnviar.id = getFuncPorId.id
          this.objParaEnviar.nome = getFuncPorId.nome
          this.objParaEnviar.local = getFuncPorId.local
        }
      })
    }
  }
}
