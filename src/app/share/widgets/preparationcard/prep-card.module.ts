import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PreparationCardComponent } from './prep-card.component';
import { AvatarModule } from '../avatar/avatar.module';


@NgModule({
    imports: [CommonModule, FormsModule, AvatarModule],
    declarations: [PreparationCardComponent],
    exports: [PreparationCardComponent, AvatarModule]
})
export class PreparationCardModule { }