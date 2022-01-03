import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/guard/auth.guard';
import { SpeakerFormComponent } from '../speaker-form/speaker-form.component';
import { SpeakerListComponent } from '../speaker-list/speaker-list.component';

const routes: Routes = [
  {
    path: '',
    component: SpeakerListComponent,
    data: { Title: 'Lista de Palestrante ' },
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: SpeakerFormComponent,
    data: { Title: 'Cadastro de Palestrante' },
    canActivate: [AuthGuard],
  },
  {
    path: ':id/edit',
    component: SpeakerFormComponent,
    data: { Title: 'Atualização de Palestrante' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerRoutingModule {}
