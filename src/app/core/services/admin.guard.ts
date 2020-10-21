import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';


import { UserSessionService } from '../services/session.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AdminGuard implements CanActivate, CanLoad {

  public constructor(
    private auth: UserSessionService,
    private router: Router,
  ) {
  }

  public canActivate(): boolean {
    if (this.auth.getCurrentUser().role === 'admin') {
      return true;
    }
    this.router.navigate([ '/' ]);
    return false;
  }

  public canLoad(): boolean {

    if (this.auth.getCurrentUser().role === 'admin') {
        return true;
      }

    this.router.navigate([ '/' ]);
    return false;
  }
}
