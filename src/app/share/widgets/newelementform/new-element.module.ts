import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewElementFormComponent } from './new-element.component';



@NgModule({
    imports: [CommonModule, FormsModule ],
    declarations: [NewElementFormComponent],
    exports: [NewElementFormComponent]
})
export class NewElementFormModule { }
