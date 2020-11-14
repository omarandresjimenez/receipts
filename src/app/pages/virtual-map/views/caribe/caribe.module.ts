
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { CaribeanRegionComponent } from './caribe.component';
import { CaribeanRegionRoutingModule } from './caribe.routing.module';


@NgModule({
  declarations: [
    CaribeanRegionComponent,
  ],
  imports: [
    CommonModule,
    CaribeanRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class CaribeanRegionModule { }
