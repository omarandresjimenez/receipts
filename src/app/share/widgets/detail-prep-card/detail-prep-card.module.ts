import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from '../avatar/avatar.module';
import { DetailPreparationComponent } from './detail-prep-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, AvatarModule, FormsModule],
    declarations: [DetailPreparationComponent],
    exports: [DetailPreparationComponent]
})
export class DetailPreparationModule { }
