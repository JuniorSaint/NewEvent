import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './Shared/guard/auth.guard';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';

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

  { path: 'logout', component: LoginComponent },

  { path: '', pathMatch: 'full', redirectTo: 'logout' },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { Title: 'Page Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
