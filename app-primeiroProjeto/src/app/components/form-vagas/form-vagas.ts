import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoVaga } from '../../models/pedido-vaga';
import { FormsModule } from '@angular/forms';
import { VagasService } from '../../services/vagas-service';
import { DepartamentosService } from '../../services/departamentos-service';
import { Departamentos } from '../../models/departamentos-vaga';
import { GestoresService } from '../../services/gestores-service';
import { Gestores } from '../../models/gestores-vaga';

@Component({
  selector: 'app-form-vagas',
  imports: [FormsModule],
  templateUrl: './form-vagas.html',
  styleUrl: './form-vagas.scss',
})
export class FormVagas implements OnInit {

  constructor(private rota: ActivatedRoute, private serviceVagas: VagasService, private serviceDepartamentos: GestoresService) { }
  ngOnInit(): void {
    this.verificarEdicaoOuCriar()
    this.carregarGestores()
  }

  arrayGestores: WritableSignal<Gestores[]> = signal([])
  carregarGestores(): void {
    this.serviceDepartamentos.getGestores().subscribe({
      next: respostaReq => {
        this.arrayGestores.set(respostaReq)
      },
      error: erro => console.log(erro)
    })
  }

  private novaVaga = false
  titulo = ''

  verificarEdicaoOuCriar() {
    let param = this.rota.snapshot.paramMap.get('id')!
    if (param == 'novaVaga') {
      console.log('Criar')
      this.titulo = 'Cadastro de Vaga'
      this.novaVaga = true
    } else {
      console.log('Editar')
      this.titulo = 'Edição de Vaga'

      this.serviceVagas.getPedidoPorId(param).subscribe({
        next: vagaParaEditar => {
          this.obj.titulo = vagaParaEditar.titulo,
            this.obj.motivo = vagaParaEditar.motivo,
            this.obj.requisitos = vagaParaEditar.requisitos,
            this.obj.quantidade = vagaParaEditar.quantidade,
            this.obj.aprovacao = vagaParaEditar.aprovacao,
            this.obj.gestorId = vagaParaEditar.gestorId,
            this.obj.dataSolicitacao = vagaParaEditar.dataSolicitacao
        }
      })
    }
  }


  obj: PedidoVaga = {
    titulo: '',
    motivo: '',
    requisitos: [],
    quantidade: 1,
    aprovacao: 'Pendente',
    gestorId: '',
    dataSolicitacao: ''
  }

  addReqs(req: string): void {
    this.obj.requisitos.push(req)
    alert('Requsito Adicionado!')
  }
  fazerRequisicaoForm(): void {
    const data = new Date()
    this.obj.dataSolicitacao = data.toISOString()
    if (this.novaVaga == true) {
      this.serviceVagas.postPedidoVagas(this.obj).subscribe({
        next: novoItem => {
          alert('Nova vaga adicionada')
        },
        error: erro => console.log(erro)
      })
    } else {
      let idParaEdit = this.rota.snapshot.paramMap.get('id')!
      this.serviceVagas.putPedidoVagas(this.obj, idParaEdit).subscribe({
        next: edicao => alert('Vaga editada'),
        error: erro => console.log(erro)
      })
    }
  }

}
