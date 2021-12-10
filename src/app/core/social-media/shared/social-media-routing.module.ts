import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialMediaFormComponent } from '../social-media-form/social-media-form.component';
import { SocialMediaListComponent } from '../social-media-list/social-media-list.component';

const routes: Routes = [

  {
    path: '',
    component: SocialMediaListComponent,
    data: { Title: 'Lista de Evento ' },
  },
  {
    path: 'new',
    component: SocialMediaFormComponent,
    data: { Title: 'Cadastro de Evento' },
  },
  {
    path: ':id/edit',
    component: SocialMediaFormComponent,
    data: { Title: 'Atualização de Evento' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }
