import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SwiperOptions } from 'swiper';


@Component({
  templateUrl: './amazonia.component.html',
  styleUrls: ['../by-region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmazoniaRegionComponent implements OnInit {
  public config: SwiperOptions;
    constructor(private router: Router,
                private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.swiperConfig();
  }

  private swiperConfig() {
    this.config = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoHeight: true,
      allowTouchMove: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
    };

  }

}
