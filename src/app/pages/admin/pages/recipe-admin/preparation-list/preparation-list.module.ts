
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';


import { PreparationListAdminActivationComponent } from './preparation-list.component';
import { PreparationListAdminRoutingModule } from './preparation-list.routing.module';
import { DetailPreparationModule } from 'src/app/share/widgets/detail-prep-card/detail-prep-card.module';
import { AppModalModule } from 'src/app/share/widgets/modal/modal.module';
import { AppUserCardModule } from 'src/app/share/widgets/user-card/user-card.module';



@NgModule({
  declarations: [
    PreparationListAdminActivationComponent
  ],
  imports: [
    CommonModule,
    PreparationListAdminRoutingModule,
    DetailPreparationModule,
    AppModalModule,
    AppUserCardModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class PreparationListAdminModule { }
