
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';


import { PreparationListAdminActivationComponent } from './preparation-list.component';
import { PreparationListAdminRoutingModule } from './preparation-list.routing.module';



@NgModule({
  declarations: [
    PreparationListAdminActivationComponent
  ],
  imports: [
    CommonModule,
    PreparationListAdminRoutingModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class PreparationListAdminModule { }
