
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-recipe.routing.module';
import { AdminRecipeComponent } from './admin-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AdminRecipeFormComponent } from './recipe/recipe-form.component';

import { ShareModule } from '../../../../../app/share/share.module';




@NgModule({
  declarations: [
    AdminRecipeComponent,
    RecipeListComponent,
    AdminRecipeFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ShareModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class AdminRecipeModule { }
