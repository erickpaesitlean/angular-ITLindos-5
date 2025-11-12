import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios-service';
import { Funcionario } from '../../models/funcionario';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamento } from '../../models/departamento';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-funcionario',
  imports: [FormsModule],
  templateUrl: './form-funcionario.html',
  styleUrl: './form-funcionario.scss',
})
export class FormFuncionario implements OnInit {


  constructor(private serviceFuncionarios: FuncionariosService, private rota: ActivatedRoute, private serviceDepartamentos: DepartamentosService) { }
  titulo: string = ''
  formCriar = false
  departamentosData: WritableSignal<Departamento[]> = signal([])
  ngOnInit(): void {
    this.postOuPut()
    this.carregarDepartamentos()
  }

  carregarDepartamentos(): void {
    this.serviceDepartamentos.getDepartamentos().subscribe({
      next: respostaReq => this.departamentosData.set(respostaReq)
    })
  }

  postOuPut(): void {
    let param = this.rota.snapshot.paramMap.get('id')
    if (param == 'novoFunc') {
      this.titulo = 'Criar Funcionário'
      this.formCriar = true
    } else {
      this.titulo = 'Editar Funcionário'
    }
  }

  funcionarioParaEnviar: Funcionario = {
    nome: '',
    cargo: '',
    salario: 0,
    departamentoId: ''
  }
  criarOuEditar(): void {
    if (this.formCriar == true) {
      this.serviceFuncionarios.postFuncionario(this.funcionarioParaEnviar).subscribe({
        next: funcAdicionado => {
          console.log(funcAdicionado)
          alert('Funcionario criado!')
        },
        error: erro => console.log(erro)
      })
    }else{
      
    }
  }

}
