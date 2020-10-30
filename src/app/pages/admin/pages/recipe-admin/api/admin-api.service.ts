import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import {  Recipe } from 'src/app/core/models/models';
import { environment } from 'src/environments/environment';
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


  public updateRecipe(recipeModel: Recipe): Observable<boolean> {
    const params = {
      name: recipeModel.name,
      image: !recipeModel.imageURL.startsWith('data') ? null : recipeModel.imageURL,
      description: recipeModel.description,
    };
    return this.http.put<boolean>(this.BASEURL + 'recipe/' + recipeModel.id, params).pipe(
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
      map((res) => res.map((item) => {
      const obj: Recipe = {
          id:  item.id,
          name: item.name,
          imageURL: item.imageURL ? item.imageURL : null,
          description: item.description,
          preparations: item.preparations.map((x: any) => {
            return {
              id: x.id,
              active: x.active,
              name : x.name,
              description: x.description,
              imageURL: x.imageURL ? x.imageURL : null,
              rating: x.rating ? x.rating : 0 ,
              region: x.region,
              author: x.autor ? x.author : {  id: 1, name: ''},
              user: x.user ? x.user : {  id: 1, name: ''},
              ingredients: x.ingredients,
              tools: x.tools,
              recipeId: x.recipeId ? x.recipeId : 1,
            };
          }),
      };
      return obj;
    })),
      catchError((err) => this.handleError(err))
    );
  }

  public updateAdminPreparation(idPrep: string, active: boolean): Observable<boolean> {
    const params = {
      id: idPrep,
      active,
    };
    return this.http.put<boolean>(this.BASEURL + 'preparation/updateAdmin/' + idPrep, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public deletePreparation(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'preparation/' + id).pipe(
      catchError((err) => this.handleError(err))
    );
  }


}
