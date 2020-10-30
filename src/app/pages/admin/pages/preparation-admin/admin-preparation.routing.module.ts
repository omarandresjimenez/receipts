import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPreparationComponent } from './admin-preparation.component';



const routes: Routes = [{
  path: '',
  component: AdminPreparationComponent,
//   children: [
//     {
//       path: 'preparation',
//       component: AdminpreparationFormComponent,
//     },
//    { path: '', redirectTo: 'preparation', pathMatch: 'full' },
//  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPrepRoutingModule { }
