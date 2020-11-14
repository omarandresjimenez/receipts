
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualMapComponent } from './virtual-map.component';
import { VirtualMapRoutingModule } from './virtual.routing.module';
import { HeaderModule } from 'src/app/share/widgets/header/header.module';
import { RouterModule } from '@angular/router';
import { VirtualMapBaseComponent } from './base.component';


@NgModule({
  declarations: [
    VirtualMapComponent,
    VirtualMapBaseComponent,
  ],
  imports: [
    CommonModule,
    VirtualMapRoutingModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: []
})
export class VirtualMapModule { }
