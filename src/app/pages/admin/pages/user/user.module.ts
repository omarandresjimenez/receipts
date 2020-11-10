
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import { UserRoutingModule } from './user.routing.module';


import { UserListComponent } from '../user/UserList/user-list/user-list.component';

import { UserContainerComponent } from '../user/user.container.component';

import { ShareModule } from 'src/app/share/share.module';
import { AppUserCardModule } from 'src/app/share/widgets/user-card/user-card.module';



@NgModule({
  declarations:  [
    UserContainerComponent,
    UserListComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ShareModule,
    AppUserCardModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
