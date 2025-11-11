import { Routes } from '@angular/router';
import { ListaVagas } from './components/lista-vagas/lista-vagas'; //importando o componente
import { FormVagas } from './components/form-vagas/form-vagas';
import { ListaGestores } from './components/lista-gestores/lista-gestores';
import { ListaDepartamentos } from './components/lista-departamentos/lista-departamentos';
export const routes: Routes = [
    {path: '',component: ListaVagas},
    {path: 'formVagas/:id', component: FormVagas},
    {path:'gestores', component: ListaGestores},
    {path: 'departamentos',component: ListaDepartamentos}
];

