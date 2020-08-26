
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container.routing.module';
import { HeaderComponent } from '../header/header.component';


import { UserFormComponent } from '../user/UserForm/user-form/user-form.component';
import { UserListComponent } from '../user/UserList/user-list/user-list.component';
import { RecipeComponent } from '../catalog/components/recipe/recipe.component';
import { SearchbarComponent } from '../catalog/components/searchbar/searchbar.component';
import { ContainerComponent } from './container.component';
import { UserContainerComponent } from '../user/user.container.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { ModalComponent } from '../catalog/components/modal/modal.component';
import { ShareModule } from '../../share/share.module';



@NgModule({
  declarations: [
    ContainerComponent,
    UserContainerComponent,
    HeaderComponent,
    UserFormComponent,
    UserListComponent,
    CatalogComponent,
    RecipeComponent,
    SearchbarComponent,
    ModalComponent,

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
