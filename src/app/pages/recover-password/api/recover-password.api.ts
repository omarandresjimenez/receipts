import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordApiService  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient) {
  }

  public ChangePaswordMail(email: string, password: string, hash: string): Observable<boolean> {
    const params = {
        email,
        password,
        hash,
      };
    return this.http.put<boolean>(this.BASEURL + 'user/UpdatePassword', params).pipe(
      catchError((err) => {
        return of(false);
      })
    );
  }

  public recoverPassword(email: string): Observable<boolean> {
    const params = {
        email
      };
    return this.http.post<boolean>(this.BASEURL + 'user/recoverPassword', params).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

}
