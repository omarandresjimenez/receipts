import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ValidaMailApiService {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient) {
  }

  public validaMail(email: string, hash: string): Observable<boolean> {
    const params = {
        email,
        hash,
      };
    return this.http.post<boolean>(this.BASEURL + 'user/emailValidation', params).pipe(
      catchError((err) => {
        return of(false);
      })
    );
  }

}
