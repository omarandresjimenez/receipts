
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { PacificRegionComponent } from './pacific.component';
import { PacificRegionRoutingModule } from './pacific.routing.module';


@NgModule({
  declarations: [
    PacificRegionComponent,
  ],
  imports: [
    CommonModule,
    PacificRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class PacificRegionModule { }
