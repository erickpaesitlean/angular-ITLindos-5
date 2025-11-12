import { Routes } from '@angular/router';
import { FuncionariosLista } from './components/funcionarios-lista/funcionarios-lista';
import { FormFuncionario } from './components/form-funcionario/form-funcionario';
import { Departamentos } from './components/departamentos/departamentos';
import { FormDepartamentos } from './components/form-departamentos/form-departamentos';

export const routes: Routes = [
    {path: '', component: FuncionariosLista},
    {path: 'formFuncionarios/:id', component: FormFuncionario},
    {path: 'departamentos',component: Departamentos},
    {path: 'formDepartamentos/:id',component: FormDepartamentos}
];
