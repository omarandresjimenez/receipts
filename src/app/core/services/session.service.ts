import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';


import { UserLogin } from '../models/userLogin';
import { ApiService } from '../../pages/admin/pages/user/api/api.service';
import { UserModel } from 'src/app/core/models/UserModel';
import { Route, Router } from '@angular/router';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public userSession$ = new Observable<UserModel>();
  private userSession = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));

  readonly TIME_OUT = 15 * 60 * 1000;  // 15 minutes
  private timeHandler;

  private userTries: any = { email: '', tries: 0 };

  constructor(private service: ApiService, private router: Router, private core: CoreService) {
    this.userSession$ = this.userSession.asObservable();
  }

  public authenticate(userInfo: UserLogin): void {
    // if user have 3 invalid passwords.. is blocked per 10 secs everu try until log correctly
    const TIME =  (this.userTries.email === userInfo.userEmail && this.userTries.tries > 2) ? 10000 : 0;
    this.core.callHttpRequest(true);
    setTimeout(() => {
      this.core.callHttpRequest(false);
      this.service.authenticate(userInfo).pipe(shareReplay(1),
        catchError( err => {
                      this.handleInvalidLogin(err, userInfo);
                      return  throwError(err);
                    })).
        subscribe((res: UserModel) => {
            this.userSession.next(res);
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.resstartTimeOut();
            this.userTries = { email: '', tries: 0 };
        });
      }, TIME);
  }

  private handleInvalidLogin(err, user: UserLogin) {
    if (err.status === 400) {
      if ( this.userTries.email === user.userEmail) {
        this.userTries.tries++;
      } else {
        this.userTries.email = user.userEmail;
        this.userTries.tries = 0;
      }
    }
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
