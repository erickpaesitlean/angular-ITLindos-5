import { Component, signal, WritableSignal } from '@angular/core';
import { DepartamentosService } from '../../services/departamentos-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Departamento } from '../../models/departamento';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamentos',
  imports: [FormsModule],
  templateUrl: './form-departamentos.html',
  styleUrl: './form-departamentos.scss',
})
export class FormDepartamentos {
  constructor(private serviceDepartamentos: DepartamentosService, private rota: ActivatedRoute, private redirecionar: Router) { }
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
    if (param == 'novoDept') {
      this.titulo = 'Criar Departamento'
      this.formCriar = true
    } else {
      this.titulo = 'Editar Departamento'
      this.serviceDepartamentos.getDepartamentoPorID(param!).subscribe({
        next: getFuncPorId => {
          this.departamentoParaEnviar.nome = getFuncPorId.nome
          this.departamentoParaEnviar.local = getFuncPorId.local
        }
      })
    }
  }

  departamentoParaEnviar: Departamento = {
    nome: '',
    local: ''
  }
  criarOuEditar(): void {
    if (this.formCriar == true) {
      this.serviceDepartamentos.postDepartamento(this.departamentoParaEnviar).subscribe({
        next: funcAdicionado => {
          console.log(funcAdicionado)
          this.departamentoParaEnviar.nome = ''
          this.departamentoParaEnviar.local = ''
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
      this.serviceDepartamentos.putDepartamento(this.departamentoParaEnviar, param!).subscribe({
        next: funcEditado => {
          console.log(funcEditado)
          this.departamentoParaEnviar.nome = ''
          this.departamentoParaEnviar.local
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
  }
}
