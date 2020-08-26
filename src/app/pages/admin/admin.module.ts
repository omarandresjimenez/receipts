
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { AdminContainerComponent } from './pages/admin.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { AdminRecipeFormComponent } from './pages/recipe/recipe-form.component';

import { ShareModule } from 'src/app/share/share.module';




@NgModule({
  declarations: [
    AdminContainerComponent,
    RecipeListComponent,
    AdminRecipeFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
