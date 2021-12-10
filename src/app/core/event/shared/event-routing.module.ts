import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventListComponent } from '../event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
    data: { Title: 'Lista de Evento ' },
  },
  {
    path: 'new',
    component: EventFormComponent,
    data: { Title: 'Cadastro de Evento' },
  },
  {
    path: ':id/edit',
    component: EventFormComponent,
    data: { Title: 'Atualização de Evento' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
