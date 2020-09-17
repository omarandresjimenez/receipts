import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'container',
      loadChildren: () => import('./pages/container/container.module').then((m) => m.ContainerModule),
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'landing',
      component: LandingComponent,
    },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
