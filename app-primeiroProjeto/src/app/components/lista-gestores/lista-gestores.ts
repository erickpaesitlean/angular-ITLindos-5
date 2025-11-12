import { Component, CSP_NONCE, OnInit, signal, WritableSignal } from '@angular/core';
import { GestoresService } from '../../services/gestores-service';
import { Gestores } from '../../models/gestores-vaga';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamentos } from '../../models/departamentos-vaga';
import { FormsModule } from '@angular/forms';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-lista-gestores',
  imports: [FormsModule],
  templateUrl: './lista-gestores.html',
  styleUrl: './lista-gestores.scss',
})
export class ListaGestores implements OnInit {
  gestoresArray: WritableSignal<Gestores[]> = signal([])
  departamentosArray: WritableSignal<Departamentos[]> = signal([])
  constructor(private serviceGestores: GestoresService, private serviceDepartamentos: DepartamentosService) { }

  ngOnInit() {
    this.carregarGestores()
    this.carregarDepartamentos()
  }
  carregarGestores(): void {
    this.serviceGestores.getGestores().subscribe({
      next: dados => {
        console.log(dados)
        this.gestoresArray.set(dados)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  carregarDepartamentos(): void {
    this.serviceDepartamentos.getDepartamentos().subscribe({
      next: dados => {
        console.log(dados)
        this.departamentosArray.set(dados)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  encontrarNomeDepartamento(idDep: string): string {
    let nomeDepartamento = this.departamentosArray().find(n => n.id == idDep)
    if (nomeDepartamento) {
      return nomeDepartamento.departamento
    } else {
      return 'Nada'
    }

  }

  deletarGestor(idGestor: string){
    this.serviceGestores.deleteGestores(idGestor).subscribe({
      next: gestorExcluido => {
        alert(`Gestor ${gestorExcluido.nome} Excluído!`)
        this.carregarGestores()
      },
      error: erro => console.log(erro)
    })
  }

  nomeGestor: string = ''
  emailGestor: string = ''
  cargoGestor: string = ''
  idDep: string = ''
  criarGestor():void{
    let objGestor: Gestores = {
      nome: this.nomeGestor,
      email: this.emailGestor,
      cargo: this.cargoGestor,
      departamentoId: this.idDep
    }

    this.serviceGestores.postGestores(objGestor).subscribe({
      next: novoGestor => {
        this.carregarGestores()
        alert(`Gestor: ${novoGestor.nome} Criado!`)
        this.nomeGestor = ''
        this.emailGestor = ''
        this.cargoGestor = ''
        this.idDep = ''
      },
      error: error => console.log(error)
    })

  }
}
