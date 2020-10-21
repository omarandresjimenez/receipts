import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserSessionService } from '../../core/services/session.service';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
public user: any;
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
