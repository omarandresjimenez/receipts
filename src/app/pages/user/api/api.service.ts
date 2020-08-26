import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserLogin, UserModel } from '../../../core/models/userLogin';
import { Observable, throwError, of } from 'rxjs';
import { UserSession } from '../../../core/models/userSession';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppHttpErrorHandler } from '../../../core/utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends AppHttpErrorHandler  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
     super(router, toast);
   }

  public authenticate(userLogin: UserLogin): Observable<UserSession> {
    return this.http.post<UserSession>(this.BASEURL + 'useritems/authenticate', userLogin)
    .pipe(
      catchError((err) => this.handleError(err))
      );
  }

  public createUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.userName,
      userPassword: userModel.userPassword,
      userRole: userModel.userAdmin ? 'admin' : 'user',
    };
    return this.http.post<boolean>(this.BASEURL + 'useritems', params);
  }

  public updateUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.userName,
      userPassword: userModel.userPassword,
      userRole: userModel.userAdmin ? 'admin' : 'user',
    };
    return this.http.put<boolean>(this.BASEURL + 'useritems/' + userModel.userName, params);
  }

  public deleteUser(userName: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'useritems/' + userName);
  }

  public getUsers(): Observable<[UserSession]> {
    return this.http.get<any>(this.BASEURL + 'useritems');
  }

}
