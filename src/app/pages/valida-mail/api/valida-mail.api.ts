import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ValidaMailApiService  extends AppHttpErrorHandler {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
    super(router, toast);
  }

  public validaMail(email: string, hash: string): Observable<boolean> {
    const params = {
        email,
        hash,
      };
    return this.http.post<boolean>(this.BASEURL + 'user/emailValidation', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

}
