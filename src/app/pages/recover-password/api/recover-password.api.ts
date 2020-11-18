import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';


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
    return this.http.post<boolean>(this.BASEURL + 'user/UpdatePwd', params);
  }

  public recoverPassword(email: string): Observable<boolean> {
    const params = {
        email
      };
    return this.http.post<boolean>(this.BASEURL + 'user/recoverpwd', params);
  }

}
