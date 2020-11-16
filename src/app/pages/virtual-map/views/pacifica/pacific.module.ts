
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { PacificRegionComponent } from './pacific.component';
import { PacificRegionRoutingModule } from './pacific.routing.module';
import { CatalogModule } from 'src/app/pages/catalog/catalog.module';


@NgModule({
  declarations: [
    PacificRegionComponent,
  ],
  imports: [
    CommonModule,
    PacificRegionRoutingModule,
    NgxUsefulSwiperModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: []
})
export class PacificRegionModule { }
