
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { CatalogComponent } from './catalog.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { DetailRecipeComponent } from './components/detail/detail.component';
import { DetailPreparationModule } from 'src/app/share/widgets/detail-prep-card/detail-prep-card.module';
import { ShareModule } from '../../share/share.module';



@NgModule({
  declarations: [
    CatalogComponent,
    SearchbarComponent,
    RecipeComponent,
    DetailRecipeComponent,
  ],
  imports: [
    CommonModule,
    DetailPreparationModule,
    ShareModule,
  ],
  exports : [
    CatalogComponent,
  ],
  providers: [],
  bootstrap: []
})
export class CatalogModule { }
