
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile.routing.module';

import { ShareModule } from '../../../../../app/share/share.module';
import { UserProfileComponent } from './user-profile.component';




@NgModule({
  declarations: [
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: []
})
export class UserProfileModule { }
