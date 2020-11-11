import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecoverPasswordProcessComponent } from './recover-password-process.component';
import { RecoverPasswordComponent } from './recover-password.component';



const routes: Routes = [{
  path: '',
  component: RecoverPasswordComponent,
  children: [
    {
      path: ':hash/:email',
      component: RecoverPasswordProcessComponent,
    },
    { path: '**', redirectTo: '/landing' },
  ],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverPasswordRoutingModule { }
