import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModalComponent } from './modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AppModalComponent],
    exports: [AppModalComponent]
})
export class AppModalModule { }