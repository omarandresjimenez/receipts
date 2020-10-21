import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRecipeComponent } from './admin-recipe.component';



const routes: Routes = [{
  path: '',
  component: AdminRecipeComponent,
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
