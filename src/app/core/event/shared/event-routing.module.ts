import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/guard/auth.guard';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventListComponent } from '../event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
    data: { Title: 'Lista de Evento ' },
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: EventFormComponent,
    data: { Title: 'Cadastro de Evento' },
    canActivate: [AuthGuard],
  },
  {
    path: ':id/edit',
    component: EventFormComponent,
    data: { Title: 'Atualização de Evento' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
