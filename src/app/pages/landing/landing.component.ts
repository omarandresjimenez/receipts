import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  // public sub: Subscription;
  constructor(private router: Router) { }

  onGo(url) {
    this.router.navigateByUrl(url);
   }

}
