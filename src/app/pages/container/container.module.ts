
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container.routing.module';


import { RecipeComponent } from '../catalog/components/recipe/recipe.component';
import { SearchbarComponent } from '../catalog/components/searchbar/searchbar.component';
import { ContainerComponent } from './container.component';

import { CatalogComponent } from '../catalog/catalog.component';
import { DetailRecipeComponent } from '../catalog/components/detail/detail.component';
import { ShareModule } from '../../share/share.module';
import { HeaderModule } from 'src/app/share/widgets/header/header.module';



@NgModule({
  declarations: [
    ContainerComponent,
    CatalogComponent,
    RecipeComponent,
    SearchbarComponent,
    DetailRecipeComponent,
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FormsModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: []
})
export class ContainerModule { }
