import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordApiService extends AppHttpErrorHandler  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
     super(router, toast);
  }

  public ChangePaswordMail(email: string, password: string, hash: string): Observable<boolean> {
    const params = {
        email,
        password,
        hash,
      };
    return this.http.put<boolean>(this.BASEURL + 'user/UpdatePassword', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public recoverPassword(email: string): Observable<boolean> {
    const params = {
        email
      };
    return this.http.post<boolean>(this.BASEURL + 'user/recoverPassword', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

}
