import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { State, City } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CitiesService  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient) {
   }

  public getStates(): Observable<State[]> {
    return this.http.get<State[]>(this.BASEURL + 'department');
  }

  public getCities(stateId?: string): Observable<City[]> {
    return this.http.get<City[]>(this.BASEURL + 'City/departmentToSearch/' + stateId);
  }

}
