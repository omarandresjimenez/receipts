
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import { UserRoutingModule } from './user.routing.module';



import { UserFormComponent } from '../user/UserForm/user-form/user-form.component';
import { UserListComponent } from '../user/UserList/user-list/user-list.component';

import { UserContainerComponent } from '../user/user.container.component';

import { ShareModule } from '../../../../share/share.module';



@NgModule({
  declarations:  [
    UserContainerComponent,
    UserFormComponent,
    UserListComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ShareModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
