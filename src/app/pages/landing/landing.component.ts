import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';

import { UserSessionService } from '../../core/services/session.service';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
public user: any;

slideData = [
  {
    id: 382,
    name: 'Metal bluetooth cyan',
  }, {
    id: 822,
    name: 'Avon',
  }, {
    id: 159,
    name: 'Infrastructures',
  }, {
    id: 424,
    name: 'Users Cotton',
  }, {
    id: 572,
    name: 'Haptic Oklahoma Jewelery',
  }, {
    id: 127,
    name: 'Circles Integration Street',
  }, {
    id: 1009,
    name: 'uniform Communications Tuna',
  }, {
    id: 619,
    name: 'North Carolina',
  }, {
    id: 716,
    name: 'Eyeballs Rubber',
  }, {
    id: 382,
    name: 'Nevada green unleash',
  }
]

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
              public session: UserSessionService) { }


 ngOnInit() {
    this.user = this.session.getCurrentUser();
 }

  onGo($event, url) {
    $event.stopPropagation();
    this.router.navigateByUrl(url);
   }


}
