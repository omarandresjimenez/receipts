
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { CaribeanRegionComponent } from './caribe.component';
import { CaribeanRegionRoutingModule } from './caribe.routing.module';
import { CatalogModule } from 'src/app/pages/catalog/catalog.module';


@NgModule({
  declarations: [
    CaribeanRegionComponent,
  ],
  imports: [
    CommonModule,
    CaribeanRegionRoutingModule,
    NgxUsefulSwiperModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: []
})
export class CaribeanRegionModule { }
