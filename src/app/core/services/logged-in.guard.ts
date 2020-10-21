import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';


import { UserSessionService } from '../services/session.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class LoggedInGuard implements CanActivate, CanLoad {

  public constructor(
    private auth: UserSessionService,
    private router: Router,
  ) {
  }

  public canActivate(): boolean {
    if (this.auth.getCurrentUser()) {
      return true;
    }
    this.router.navigate([ '/' ]);
    return false;
  }

  public canLoad(): boolean {

    if (this.auth.getCurrentUser()) {
        return true;
      }

    this.router.navigate([ '/' ]);
    return false;
  }
}
