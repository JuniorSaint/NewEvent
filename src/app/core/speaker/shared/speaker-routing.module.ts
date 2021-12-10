import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakerFormComponent } from '../speaker-form/speaker-form.component';
import { SpeakerListComponent } from '../speaker-list/speaker-list.component';

const routes: Routes = [
  {
    path: '',
    component: SpeakerListComponent,
    data: { Title: 'Lista de Palestrante ' },
  },
  {
    path: 'new',
    component: SpeakerFormComponent,
    data: { Title: 'Cadastro de Palestrante' },
  },
  {
    path: ':id/edit',
    component: SpeakerFormComponent,
    data: { Title: 'Atualização de Palestrante' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerRoutingModule {}
