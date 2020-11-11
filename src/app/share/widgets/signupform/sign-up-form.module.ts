import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignUpFormComponent } from './sign-up-form.component';
import { PipesModule } from '../../pipes/pipes.module';
import { FieldMatchesDirectiveModule } from 'src/app/share/directives/directives.module';

@NgModule({
    imports: [CommonModule, FormsModule, PipesModule, FieldMatchesDirectiveModule],
    declarations: [SignUpFormComponent],
    exports: [SignUpFormComponent]
})
export class SignUpFormModule { }
