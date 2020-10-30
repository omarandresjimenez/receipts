import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { UserSessionService } from '../../../core/services/session.service';
import { UserModel } from 'src/app/core/models/UserModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public sessionUser$: Observable<UserModel>;
  // public sub: Subscription;
  constructor(public session: UserSessionService,
              private router: Router) { }

  ngOnInit(): void {
    this.sessionUser$ = this.session.userSession$;
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onLogOut() {
    this.session.closeSession();
  }

  goto(url) {
    this.router.navigateByUrl(url);
  }

   onGoAdmin() {
    this.router.navigateByUrl('container/admin-recipe');
   }

   onGoPreparations() {
    this.router.navigateByUrl('container/admin-preparation');
   }

   onGoAdminUsers() {
    this.router.navigateByUrl('container/admin-user');
   }

   onGoProfile() {
    this.router.navigateByUrl('container/profile');
   }

}
