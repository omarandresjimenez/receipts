import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './pages/admin.component';
import { AdminRecipeFormComponent } from './pages/recipe/recipe-form.component';


const routes: Routes = [{
  path: '',
  component: AdminContainerComponent,
//   children: [
//     {
//       path: 'recipe',
//       component: AdminRecipeFormComponent,
//     },
//    { path: '', redirectTo: 'recipe', pathMatch: 'full' },
//  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
