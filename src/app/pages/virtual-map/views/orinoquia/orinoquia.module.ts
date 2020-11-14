
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { OrinoquiaRegionComponent } from './orinoquia.component';
import { OrinoquiaRegionRoutingModule } from './orinoquia.routing.module';


@NgModule({
  declarations: [
    OrinoquiaRegionComponent,
  ],
  imports: [
    CommonModule,
    OrinoquiaRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class OrinoquiaRegionModule { }
