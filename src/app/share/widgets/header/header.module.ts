import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
    imports: [CommonModule, AvatarModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
