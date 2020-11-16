
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AndeanRegionComponent } from './andina.component';
import { AndeanRegionRoutingModule } from './andina.routing.module';
import { CatalogModule } from 'src/app/pages/catalog/catalog.module';


@NgModule({
  declarations: [
    AndeanRegionComponent,
  ],
  imports: [
    CommonModule,
    AndeanRegionRoutingModule,
    NgxUsefulSwiperModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: []
})
export class AndeanRegionModule { }
