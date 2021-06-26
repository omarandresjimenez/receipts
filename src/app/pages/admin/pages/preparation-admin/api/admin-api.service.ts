import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppHttpErrorHandler } from 'src/app/core/utils/errorHandler';
import { CookingTechnique, Ingredient, ItemChip, Preparation, Region, Tool } from 'src/app/core/models/models';
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
    return this.http.get<Preparation[]>(this.BASEURL + 'preparation/getPreparationsByUser/' + userId).pipe(
      catchError((err) => this.handleError(err)),
      map((preps: any[]) => preps.map((prep: any) => {
        return  { ...prep,
          active: prep.isActive,
          city: { ...prep.city, idState: prep.city.department?.id},
          creationDate: prep.createdDate?.substring(0, 10),
          rating: prep.ratingAvg,
        };
      })
    ));
  }

  public getPreparationsByRecipe(recipeId: string): Observable<Preparation[]> {
    return this.http.get<Preparation[]>(this.BASEURL + 'preparation/getPreparationsByRecipe/' + recipeId).pipe(
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

  public createPreparation(preparationModel: Preparation): Observable<Preparation> {
    const params = {
      recipeId: +preparationModel.recipe.id,
      name: preparationModel.name,
      image: !preparationModel.imageUrl?.startsWith('data') ? null : preparationModel.imageUrl,
      description: preparationModel.description,
      preparationType: preparationModel.preparationType,
      preparationIngredientsIds: preparationModel.ingredients.map(p  => p.id),
      preparationToolsIds: preparationModel.tools.map(t  => t.id),
      authorId: +preparationModel.author.id,
      userId: +preparationModel.user.id,
      cityId: +preparationModel.city.id,
      cookingTechniqueId: preparationModel.cookingTechnique.id ? +preparationModel.cookingTechnique.id : null,
      source: preparationModel.source,
      carrierCommunity: preparationModel.carrierCommunity,
      forSale: preparationModel.forSale,
      preparationSteps: preparationModel.preparationSteps,
      use: preparationModel.use,
      transmissionWay: preparationModel.transmissionWay,
      isActive: false,
    };
    return this.http.post<string>(this.BASEURL + 'preparation', params).pipe(
      catchError((err) => this.handleError(err))
    );
  }


  public updatePreparation(preparationModel: Preparation): Observable<boolean> {
    const params = {
      id: +preparationModel.id,
      recipeId: +preparationModel.recipe.id,
      name: preparationModel.name,
      image: !preparationModel.imageUrl?.startsWith('data') ? null : preparationModel.imageUrl,
      description: preparationModel.description,
      preparationType: preparationModel.preparationType,
      preparationIngredientsIds: preparationModel.ingredients.map(p  => p.id),
      preparationToolsIds: preparationModel.tools.map(t  => t.id),
      authorId: +preparationModel.author.id,
      userId: +preparationModel.user.id,
      cityId: +preparationModel.city.id,
      cookingTechniqueId: preparationModel.cookingTechnique.id ? +preparationModel.cookingTechnique.id : null,
      source: preparationModel.source,
      carrierCommunity: preparationModel.carrierCommunity,
      forSale: preparationModel.forSale,
      preparationSteps: preparationModel.preparationSteps,
      use: preparationModel.use,
      transmissionWay: preparationModel.transmissionWay,
      isActive: false,
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

  public getCookingTechniques(): Observable<CookingTechnique[]> {

    return this.http.get<Tool[]>(this.BASEURL + 'cookingTechnique/').pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public createCookingTechnique(dataInfo: ItemChip): Observable<ItemChip> {
    const params = {
      name: dataInfo.name,
      description: dataInfo.description,
     };
    // return of({ ...ingredientInfo, id: '1' });
    return this.http.post<ItemChip>(this.BASEURL + 'cookingTechnique', params).pipe(
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




}
