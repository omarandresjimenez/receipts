import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from '../../../../../core/utils/errorHandler';
import {  Recipe } from '../../../../../core/models/models';
import { environment } from '../../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminApiService extends AppHttpErrorHandler  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
     super(router, toast);
   }


  public createRecipe(recipeModel: Recipe): Observable<boolean> {
    const params = {
      name: recipeModel.name,
      image: recipeModel.imageURL,
      description: recipeModel.description,
      preparations: [],
    };
    return this.http.post<boolean>(this.BASEURL + 'recipe', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }


  public updateeRecipe(recipeModel: Recipe): Observable<boolean> {
    const params = {
      id: recipeModel.id,
      name: recipeModel.name,
      image: recipeModel.imageURL,
      description: recipeModel.description,
      preparations: [],
    };
    return this.http.post<boolean>(this.BASEURL + 'recipe', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public deleteRecipe(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'recipe/' + id).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.BASEURL + 'recipe').pipe(
      catchError((err) => this.handleError(err))
    );
  }

}
