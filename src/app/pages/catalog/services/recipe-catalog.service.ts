import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';

import { RecipeApiService } from '../api/recipe.api';
import { Recipe, Preparation } from '../../../core/models/models';


@Injectable({
  providedIn: 'root',
})
export class RecipeCatalogService {
  public recipeCatalog$ = new Observable<Recipe[]>();
  public ratingFilter$  = new Observable<number>();
  public recipeImages$ = new Observable<string[]>();
  private RecipeCatalog = new BehaviorSubject<Recipe[]>([]);
  private recipeImages = new BehaviorSubject<string[]>([]);
  private ratingFilter = new BehaviorSubject<number>(1);
  constructor(private service: RecipeApiService) {
    this.recipeCatalog$ = this.RecipeCatalog.asObservable();
    this.recipeImages$ = this.recipeImages.asObservable();
    this.ratingFilter$ = this.ratingFilter.asObservable();
  }

  public searchRecipes(search: string): void {
    this.service.recipeSearch(search).pipe(shareReplay(1)).
        subscribe((res: Recipe[]) => {
          this.RecipeCatalog.next(res);
      });
  }

  public searchRecipesByRegion(regionId: number): void {
    this.service.recipeSearchByRegion(regionId).pipe(shareReplay(1)).
        subscribe((res: Recipe[]) => {
          this.RecipeCatalog.next(res);
      });
  }

  public searchRecipesBasic(search: string): Observable<Recipe[]> {
    return this.service.recipeSearch(search);
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.service.getRecipes();
  }

  public getRecipesImages(): void {
    this.service.getRandomImages().pipe(
        ).
        subscribe((res: any[]) => {
          res = res.map((x: any) => x.meals[0].strMealThumb);
          this.recipeImages.next(res);
      });
  }
  public setRatingFilter(val: number): void {
     this.ratingFilter.next(val);
  }

  public getPreparationsByRecipe(recipeId: string): Observable<Preparation[]> {
    return this.service.getPreparationsByRecipe(recipeId);
  }

  public ratePreparation(authorId: number, preparationId: string, comment: string, rating: number): Observable<boolean> {
    return this.service.ratePreparation(authorId, preparationId, comment, rating);
  }

  public getRatingPreparation(idPrep: string): Observable<number> {
    return this.service.getRatingPreparation(idPrep);
  }
}
