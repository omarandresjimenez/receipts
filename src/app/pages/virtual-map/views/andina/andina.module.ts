
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AndeanRegionComponent } from './andina.component';
import { AndeanRegionRoutingModule } from './andina.routing.module';


@NgModule({
  declarations: [
    AndeanRegionComponent,
  ],
  imports: [
    CommonModule,
    AndeanRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class AndeanRegionModule { }
