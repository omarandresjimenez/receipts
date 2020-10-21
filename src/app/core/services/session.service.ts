import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';


import { UserLogin } from '../models/userLogin';
import { ApiService } from '../../pages/admin/pages/user/api/api.service';
import { UserModel } from 'src/app/core/models/UserModel';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public userSession$ = new Observable<UserModel>();
  private userSession = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));

  readonly TIME_OUT = 15 * 60 * 1000;  // 15 minutes
  private timeHandler;

  constructor(private service: ApiService, private router: Router) {
    this.userSession$ = this.userSession.asObservable();
  }

  public authenticate(userInfo: UserLogin): void {

    this.service.authenticate(userInfo).pipe(shareReplay(1),
      catchError( err => throwError(err))).
      subscribe((res: UserModel) => {
          this.userSession.next(res);
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.resstartTimeOut();
      });
  }

  public getCurrentUser(): UserModel {
    return this.userSession.getValue();
  }


  public closeSession() {
    if (this.timeHandler) {
      clearTimeout(this.timeHandler);
    }
    localStorage.removeItem('currentUser');
    this.userSession.next(null);
    this.router.navigateByUrl('');
  }

  public resstartTimeOut() {
    if (this.timeHandler) {
      clearTimeout(this.timeHandler);
    }
    this.timeHandler = setTimeout(() => {
      this.closeSession();
    }, this.TIME_OUT);
  }

}
