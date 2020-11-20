import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignUpComponent } from './pages/signup/sign-up.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'container',
      loadChildren: () => import('./pages/container/container.module').then((m) => m.ContainerModule),
    },
    {
      path: 'validamail',
      loadChildren: () => import('./pages/valida-mail/valida-email.module').then((m) => m.ValidateMailModule),
    },
    {
      path: 'recoverpassword',
      loadChildren: () => import('./pages/recover-password/recover-password.module').then((m) => m.RecoverPasswordModule),
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'signUp',
      component: SignUpComponent,
    },
    {
      path: 'landing',
      component: LandingComponent,
    },
    {
      path: 'virtual-map',
      loadChildren: () => import('./pages/virtual-map/virtual.module').then((m) => m.VirtualMapModule),
    },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: '**', redirectTo: 'landing', pathMatch: 'full' },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
