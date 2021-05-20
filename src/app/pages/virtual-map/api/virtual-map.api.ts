import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { Story, Iniciative } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root'
})
export class VirtualMapApiService  extends AppHttpErrorHandler {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
    super(router, toast);
  }

  public getRegionStories(idRegion: number): Observable<Story[]> {
    return this.http.get<any>(this.BASEURL + 'region/' + idRegion).pipe(
      catchError((err) => this.handleError(err)),
      map(res => res ?  res.stories : []),
      );
  }

  public getRegionIniciatives(idRegion: number): Observable<Iniciative[]> {
    return this.http.get<any>(this.BASEURL + 'iniciative/regionToSearch/' + idRegion).pipe(
      catchError((err) => this.handleError(err)),
      );
  }
}
