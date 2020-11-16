
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { OrinoquiaRegionComponent } from './orinoquia.component';
import { OrinoquiaRegionRoutingModule } from './orinoquia.routing.module';
import { CatalogModule } from 'src/app/pages/catalog/catalog.module';


@NgModule({
  declarations: [
    OrinoquiaRegionComponent,
  ],
  imports: [
    CommonModule,
    OrinoquiaRegionRoutingModule,
    NgxUsefulSwiperModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: []
})
export class OrinoquiaRegionModule { }
