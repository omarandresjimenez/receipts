
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AdminPrepRoutingModule } from './admin-preparation.routing.module';
import { AdminPreparationComponent } from './admin-preparation.component';
import { PreparationListComponent } from './preparation-list/preparation-list.component';
import { PreparationFormComponent } from './preparation-form/preparation-form.component';

import { ShareModule } from 'src/app/share/share.module';
import { ChipAutocompleteModule } from 'src/app/share/widgets/chip-autocomplete/chip-autocomplete.module';
import { NewElementFormModule } from 'src/app/share/widgets/newelementform/new-element.module';



@NgModule({
  declarations: [
    AdminPreparationComponent,
    PreparationListComponent,
    PreparationFormComponent,
  ],
  imports: [
    CommonModule,
    AdminPrepRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    MatAutocompleteModule,
    ChipAutocompleteModule,
    NewElementFormModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: []
})
export class AdminPreparationModule { }
