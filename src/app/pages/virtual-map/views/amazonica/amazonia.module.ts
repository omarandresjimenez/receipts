
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AmazoniaRegionComponent } from './amazonia.component';
import { AmazoniaRegionRoutingModule } from './amazonia.routing.module';


@NgModule({
  declarations: [
    AmazoniaRegionComponent,
  ],
  imports: [
    CommonModule,
    AmazoniaRegionRoutingModule,
    NgxUsefulSwiperModule,
  ],
  providers: [],
  bootstrap: []
})
export class AmazoniaRegionModule { }
