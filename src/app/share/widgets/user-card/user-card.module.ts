import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserCardComponent } from './user-card.component';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
    imports: [CommonModule, FormsModule, AvatarModule],
    declarations: [UserCardComponent],
    exports: [UserCardComponent]
})
export class AppUserCardModule { }
