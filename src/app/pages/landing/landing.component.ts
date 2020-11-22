
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject,  ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from 'src/app/core/models/models';
import { Router } from '@angular/router';

import { UserSessionService } from '../../core/services/session.service';
import { VirtualMapApiService } from '../virtual-map/api/virtual-map.api';
import { Swiper, SwiperOptions } from 'swiper';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
public user: any;
@ViewChild('stories')
public swiperStories: Swiper;

public regionId = Math.floor(Math.random() * 7);

config: SwiperOptions = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoHeight: true,
  allowTouchMove: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: true
  },
  breakpoints: {
    1024: {
      slidesPerView: 1
    },
    500: {
      slidesPerView: 1
    },
    400: {
      slidesPerView: 1
    },
    300: {
      slidesPerView: 1
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  loop: true
};

  // public sub: Subscription;
  constructor(private router: Router,
              public session: UserSessionService,
              @Inject(DOCUMENT)
              private document: Document,
              private service: VirtualMapApiService) { }


 ngOnInit() {
    this.user = this.session.getCurrentUser();
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
    });
}
  onGo($event, url) {
    $event.stopPropagation();
    this.router.navigateByUrl(url);
   }


}
