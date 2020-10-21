import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignUpFormComponent } from './sign-up-form.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, FormsModule, PipesModule],
    declarations: [SignUpFormComponent],
    exports: [SignUpFormComponent]
})
export class SignUpFormModule { }