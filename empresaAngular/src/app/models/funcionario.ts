import { UrlMatchResult } from "@angular/router"

export interface Funcionario {
    id?: string
    nome: string
    cargo: string
    salario: number
    departamentoId: string
}
