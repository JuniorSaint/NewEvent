import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./core/user/Shared/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'event',
    loadChildren: () =>
      import('./core/event/shared/event.module').then((mod) => mod.EventModule),
  },
  {
    path: 'speaker',
    loadChildren: () =>
      import('./core/speaker/shared/speaker.module').then(
        (mod) => mod.SpeakerModule
      ),
  },
  {
    path: 'socialMedia',
    loadChildren: () =>
      import('./core/social-media/shared/social-media.module').then(
        (mod) => mod.SocialMediaModule
      ),
  },
  // { path: 'lot', loadChildren: () => import('./core/event/lot/shared/lot.module').then(mod => mod.LotModule) },

  { path: 'login', component: LoginComponent },
  // { path: 'report', component: ReportComponent, data: { Title: 'Relatório' } },
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: '**', component: PageNotFoundComponent, data: { Title: 'Page Not Found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
