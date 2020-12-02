import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';


import { Preparation, Recipe } from 'src/app/core/models/models';
import { AdminApiService } from '../api/admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public newRecipeAdded$ = new Observable<Recipe>();
  private newRecipeAdded = new Subject<Recipe>();

  constructor(private service: AdminApiService) {
    this.newRecipeAdded$ = this.newRecipeAdded.asObservable();
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.service.getRecipes();
    // .pipe(map((val: Recipe[]) => val.slice(val.length - 10)));
  }

  public notifyNewRecipe(rec: Recipe): void {
    this.newRecipeAdded.next(rec);
  }

  public createRecipe(recipeInfo: Recipe): Observable<Recipe> {
    return this.service.createRecipe(recipeInfo);
  }

  public updateRecipe(recipeInfo: Recipe): Observable<boolean> {
    return this.service.updateRecipe(recipeInfo);
  }

  public deleteRecipe(id: string): Observable<boolean> {
    return this.service.deleteRecipe(id);
  }

  public updateAdminPreparation(id: string, active: boolean): Observable<boolean> {
    return this.service.updateAdminPreparation(id, active);
  }

  public deletePreparation(id: string): Observable<boolean> {
    return this.service.deletePreparation(id);
  }

  public getInactivePreparations(): Observable<Preparation[]> {
    return this.service.getInactivePreparations();
  }

}
