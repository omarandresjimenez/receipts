import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipAutocompleteComponent } from './chip-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule,
              MatFormFieldModule,  MatAutocompleteModule,
              MatChipsModule ],
    declarations: [ChipAutocompleteComponent],
    exports: [ChipAutocompleteComponent]
})
export class ChipAutocompleteModule { }
