import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from '../../../../../core/utils/errorHandler';
import {  Recipe } from '../../../../../core/models/models';
import { environment } from '../../../../../../environments/environment';



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
      description: recipeModel.summary,
      preparations: [],
    };
    return this.http.post<boolean>(this.BASEURL + 'recipe', params);
  }


  public updateeRecipe(recipeModel: Recipe): Observable<boolean> {
    const params = {
      id: recipeModel.id,
      name: recipeModel.name,
      image: recipeModel.imageURL,
      description: recipeModel.summary,
      preparations: [],
    };
    return this.http.post<boolean>(this.BASEURL + 'recipe', params);
  }

  public deleteRecipe(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'recipe/' + id);
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<any>(this.BASEURL + 'recipe');
  }

}
