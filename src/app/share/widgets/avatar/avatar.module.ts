import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../../pipes/pipes.module';
import { AvatarComponent } from './avatar.component';

@NgModule({
    imports: [CommonModule,  PipesModule],
    declarations: [AvatarComponent],
    exports: [AvatarComponent]
})
export class AvatarModule { }
