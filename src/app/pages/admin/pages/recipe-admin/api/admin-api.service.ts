import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import {  Preparation, Recipe } from 'src/app/core/models/models';
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
      image: recipeModel.imageUrl,
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
      image: !recipeModel.imageUrl?.startsWith('data') ? null : recipeModel.imageUrl,
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
    return this.http.get<any[]>(this.BASEURL + 'recipe').pipe(
      map((res) => res.map((item) => {
      const obj: Recipe = {
          id:  item.id,
          name: item.name,
          imageUrl: item.imageUrl ? item.imageUrl : null,
          description: item.description,

      };
      return obj;
    })),
      catchError((err) => this.handleError(err))
    );
  }

  public getInactivePreparations(): Observable<Preparation[]> {
    return this.http.get<Preparation[]>(this.BASEURL + 'preparation/getInactivePreparations/').pipe(
      catchError((err) => this.handleError(err)),
      map((preps: any[]) => preps.map((prep: any) => {
        return  { ...prep,
          active: prep.isActive,
          creationDate: prep.createdDate?.substring(0, 10),
          rating: prep.ratingAvg,
        };
      })
    ));
  }


  public updateAdminPreparation(idPrep: string, active: boolean): Observable<boolean> {
    const params = {
      isActive: active,
    };
    return this.http.put<boolean>(this.BASEURL + 'preparation/updatePreparationByAdmin/' + idPrep, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public deletePreparation(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'preparation/' + id).pipe(
      catchError((err) => this.handleError(err))
    );
  }


}
