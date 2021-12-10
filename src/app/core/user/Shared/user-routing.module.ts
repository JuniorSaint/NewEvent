import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { Title: 'Lista de Usuários ' },
  },
  {
    path: 'new',
    component: UserFormComponent,
    data: { Title: 'Cadastro de Usuário' },
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
    data: { Title: 'Atualização de Usuário' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
