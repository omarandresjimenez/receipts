import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BottomBarComponent } from './bottom-bar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BottomBarComponent],
    exports: [BottomBarComponent]
})
export class BottomBarModule { }
