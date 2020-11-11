import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidaMailProcessComponent } from './valida-mail-process.component';
import { ValidaMailComponent } from './valida-mail.component';



const routes: Routes = [{
  path: '',
  component: ValidaMailComponent,
  children: [
    {
      path: ':hash/:email',
      component: ValidaMailProcessComponent,
    },
    { path: '**', redirectTo: '/landing' },
  ],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidaMailRoutingModule { }
