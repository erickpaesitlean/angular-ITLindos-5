import { Routes } from '@angular/router';
import { FuncionariosLista } from './components/funcionarios-lista/funcionarios-lista';
import { FormFuncionario } from './components/form-funcionario/form-funcionario';

export const routes: Routes = [
    {path: '', component: FuncionariosLista},
    {path: 'formFuncionarios/:id', component: FormFuncionario}
];
