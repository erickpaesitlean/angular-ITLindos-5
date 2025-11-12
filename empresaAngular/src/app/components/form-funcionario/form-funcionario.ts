import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios-service';
import { Funcionario } from '../../models/funcionario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamento } from '../../models/departamento';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-funcionario',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-funcionario.html',
  styleUrl: './form-funcionario.scss',
})
export class FormFuncionario implements OnInit {

  formularioFuncionario!: FormGroup
  constructor(private serviceFuncionarios: FuncionariosService, private rota: ActivatedRoute, private serviceDepartamentos: DepartamentosService, private fb: FormBuilder, private redirecionar: Router) { }
  titulo: string = ''
  textoButton: string = ''
  formCriar = false
  departamentosData: WritableSignal<Departamento[]> = signal([])
  ngOnInit(): void {
    this.postOuPut()
    this.carregarDepartamentos()
    this.formularioFuncionario = this.fb.group({
      nome: ['', [
        Validators.required,
      ]],
      cargo: ['', [
        Validators.required
      ]],
      salario: [0, [
        Validators.required
      ]],
      departamentoId: ['', [
        Validators.required
      ]]
    })
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
      this.textoButton = 'Criar Funcionário'
    } else {
      this.titulo = 'Editar Funcionário'
      this.textoButton = 'Editar Funcionário'
      this.serviceFuncionarios.getFuncionarioPorID(param!).subscribe({
        next: getFuncPorId => {
          this.formularioFuncionario.patchValue(getFuncPorId)
        }
      })
    }
  }
  mostrarAlerta(campo: string){
    alert(`Campo ${campo} está inválido`)
  }
  criarOuEditar(): void {
    if (this.formularioFuncionario.valid) {
      if (this.formCriar == true) {
        this.serviceFuncionarios.postFuncionario(this.formularioFuncionario.value).subscribe({
          next: funcAdicionado => {
            console.log(funcAdicionado)
            this.formularioFuncionario.reset()
            Swal.fire({
              title: 'Sucesso!',
              text: 'Você criou um novo Funcionário!',
              icon: 'success'
            })
            this.redirecionar.navigate([''])
          },
          error: erro => console.log(erro)
        })
      } else {
        let param = this.rota.snapshot.paramMap.get('id')
        this.serviceFuncionarios.putFuncionario(this.formularioFuncionario.value, param!).subscribe({
          next: funcEditado => {
            console.log(funcEditado)
            this.formularioFuncionario.reset()
            Swal.fire({
              title: 'Sucesso!',
              text: 'Você editou as informações do Funcionário!',
              icon: 'success'
            })
            this.redirecionar.navigate([''])
          },
          error: erro => console.log(erro)
        })
      }
    }else{
      Swal.fire({
        title: 'Erro',
        text: 'Você deve preencher todos os Campos!',
        icon: 'error',
      })
    }

  }

}
