import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { Ingredient, ItemChip, Preparation, Region, Tool } from 'src/app/core/models/models';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PreparationApiService extends AppHttpErrorHandler  {
  private readonly BASEURL = environment.baseUrlApi;
  constructor(private http: HttpClient,
              public router: Router,
              public toast: ToastrService) {
     super(router, toast);
   }

  public getPreparationsByUser(userId: string): Observable<Preparation[]> {
    // return of([
    //    {
    //       id: '1',
    //       recipe: {
    //          id: '1',
    //          name: 'Ajiaco Santafereno',
    //       },
    //       active: true,
    //       name : 'Ajiaco Santafereno',
    //       description: 'Ajiaco tipico region Centro... bla',
    //       imageURL: 'http://gastroherencia/images/ajaicosant.jpg',
    //       cookingTechnique: 'tecnica de cocina',
    //       preparationType:  'tipo preparacion',
    //       rating: 3.4,
    //       region:  {
    //                      id: '1',
    //                       name: 'andina',
    //                    },
    //       ingredients: [
    //         {
    //           id: '1',
    //           name: 'Pollo',
    //         }
    //      ],
    //        tools: [
    //         {
    //            id: '1',
    //            name: 'Olla de Ajiaco'
    //         }
    //       ],
    //       user: {
    //         id: '1',
    //         name: 'Pedro',
    //         lastName: 'Perez',
    //         imageUrl: ''
    //       },
    //       author: {
    //         id: '1',
    //         name: 'Maria',
    //         lastName: 'Lopez',
    //         imageUrl: ''
    //       }
    //  }
    // ]);
    return this.http.get<Preparation[]>(this.BASEURL + 'preparation/getPreparationsByUser/' + userId).pipe(
      catchError((err) => this.handleError(err))
    );
  }


  public createPreparation(preparationModel: Preparation): Observable<string> {
    const params = {
      recipeId: preparationModel.recipe.id,
      name: preparationModel.name,
      image: preparationModel.imageURL,
      description: preparationModel.description,
      cookingTechnique: preparationModel.cookingTechnique,
      preparationType: preparationModel.preparationType,
      preparationIngredients: preparationModel.ingredients.map(p  => p.id),
      preparationTools: preparationModel.tools.map(t  => t.id),
      authorId: preparationModel.author.id,
      userId: preparationModel.user.id,
      regionId: preparationModel.region.id,
    };
    return this.http.post<string>(this.BASEURL + 'preparation', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }


  public updatePreparation(preparationModel: Preparation): Observable<boolean> {
    const params = {
      id: preparationModel.id,
      recipeId: preparationModel.recipe.id,
      name: preparationModel.name,
      image: !preparationModel.imageURL.startsWith('data') ? null : preparationModel.imageURL,
      description: preparationModel.description,
      cookingTechnique: preparationModel.cookingTechnique,
      preparationType: preparationModel.preparationType,
      preparationIngredients: preparationModel.ingredients.map(p  => p.id),
      preparationTools: preparationModel.tools.map(t  => t.id),
      authorId: preparationModel.author.id,
      userId: preparationModel.user.id,
      regionId: preparationModel.region.id,
    };
    return this.http.put<boolean>(this.BASEURL + 'preparation/' + preparationModel.id, params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public deletePreparation(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'preparation/' + id).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public getIngredients(): Observable<Ingredient[]> {

    return this.http.get<Ingredient[]>(this.BASEURL + 'ingredient/').pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public getTools(): Observable<Tool[]> {

    return this.http.get<Tool[]>(this.BASEURL + 'tool/').pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public createIngredient(ingredientInfo: ItemChip): Observable<ItemChip> {
    const params = {
      name: ingredientInfo.name,
      description: ingredientInfo.description,
     };
    // return of({ ...ingredientInfo, id: '1' });
    return this.http.post<ItemChip>(this.BASEURL + 'ingredient', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public createTool(toolInfo: ItemChip): Observable<ItemChip> {
    const params = {
      name: toolInfo.name,
      description: toolInfo.description,
     };
    return this.http.post<ItemChip>(this.BASEURL + 'tool', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }


  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.BASEURL + 'region/').pipe(
      catchError((err) => this.handleError(err))
    );
  }

}