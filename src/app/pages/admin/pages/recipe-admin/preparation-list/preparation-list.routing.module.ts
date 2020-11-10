import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreparationListAdminActivationComponent } from './preparation-list.component';



const routes: Routes = [{
  path: '',
  component: PreparationListAdminActivationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreparationListAdminRoutingModule { }
