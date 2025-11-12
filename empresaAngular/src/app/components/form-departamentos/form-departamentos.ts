import { Component, signal, WritableSignal } from '@angular/core';
import { DepartamentosService } from '../../services/departamentos-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Departamento } from '../../models/departamento';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamentos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-departamentos.html',
  styleUrl: './form-departamentos.scss',
})
export class FormDepartamentos {
  constructor(private serviceDepartamentos: DepartamentosService, private rota: ActivatedRoute, private redirecionar: Router, private fb: FormBuilder) { }
  titulo: string = ''
  formCriar = false
  textoButton: string = ''
  departamentosData: WritableSignal<Departamento[]> = signal([])
  formularioDepartamento!: FormGroup

  ngOnInit(): void {
    this.postOuPut()
    this.carregarDepartamentos()
    this.formularioDepartamento = this.fb.group({
      nome: ['', [
        Validators.required
      ]],
      local: ['', [
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
    if (param == 'novoDept') {
      this.titulo = 'Criar Departamento'
      this.formCriar = true
      this.textoButton = 'Criar Departamento'
    } else {
      this.titulo = 'Editar Departamento'
      this.textoButton = 'Editar Departamento'
      this.serviceDepartamentos.getDepartamentoPorID(param!).subscribe({
        next: getFuncPorId => {
          this.formularioDepartamento.patchValue(getFuncPorId)
        }
      })
    }
  }


  criarOuEditar(): void {
    if (this.formularioDepartamento.valid) {
      if (this.formCriar == true) {
        this.serviceDepartamentos.postDepartamento(this.formularioDepartamento.value).subscribe({
          next: funcAdicionado => {
            console.log(funcAdicionado)
            this.formularioDepartamento.reset()
            Swal.fire({
              title: 'Sucesso!',
              text: 'Você criou um novo Departamento!',
              icon: 'success'
            })
            this.redirecionar.navigate(['/departamentos'])
          },
          error: erro => console.log(erro)
        })
      } else {
        let param = this.rota.snapshot.paramMap.get('id')
        this.serviceDepartamentos.putDepartamento(this.formularioDepartamento.value, param!).subscribe({
          next: funcEditado => {
            console.log(funcEditado)
            this.formularioDepartamento.reset()
            Swal.fire({
              title: 'Sucesso!',
              text: 'Você editou as informações do Departamento!',
              icon: 'success'
            })
            this.redirecionar.navigate(['/departamentos'])
          },
          error: erro => console.log(erro)
        })
      }
    }else{
      Swal.fire({
        title: 'Erro',
        text: 'Você deve preencher todos os campos!',
        icon: 'error'
      })
    }

  }
}
