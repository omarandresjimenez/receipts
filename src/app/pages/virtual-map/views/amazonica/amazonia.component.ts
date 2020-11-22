import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from 'src/app/core/models/models';


import Swiper, { SwiperOptions } from 'swiper';
import { VirtualMapApiService } from '../../api/virtual-map.api';


@Component({
  templateUrl: './amazonia.component.html',
  styleUrls: ['../by-region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmazoniaRegionComponent implements OnInit, AfterViewInit {
  @ViewChild('stories')
  public swiperStories: Swiper;

  public regionId = 1;
  public regionStories$: Observable<Story[]>;
  public config: SwiperOptions;
    constructor(@Inject(DOCUMENT)
                private document: Document,
                private cdr: ChangeDetectorRef,
                private service: VirtualMapApiService) { }

  public ngOnInit(): void {
    this.swiperConfig();
  }

  ngAfterViewInit(): void {
    this.service.getRegionStories(this.regionId).subscribe((res: Story[]) => {
      res.map((story) => {
        const newDiv = this.document.createElement('div');
        newDiv.className = 'swiper-slide';
        newDiv.innerHTML = story?.content;
        // tslint:disable-next-line:no-string-literal
        this.swiperStories['swiper'].appendSlide(newDiv);
      });
      if (res.length) {
        // tslint:disable-next-line:no-string-literal
        this.swiperStories['swiper'].removeSlide(0);
      }
      this.cdr.markForCheck();
      });
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
