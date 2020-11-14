
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { InsularRegionComponent } from './insular.component';
import { InsularRegionRoutingModule } from './insular.routing.module';


@NgModule({
  declarations: [
    InsularRegionComponent,
  ],
  imports: [
    CommonModule,
    InsularRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class InsularRegionModule { }
