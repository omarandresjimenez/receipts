import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { Recipe } from 'src/app/core/models/models';
import { AdminApiService } from '../api/admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public newRecipeAdded$ = new Observable();
  private newRecipeAdded = new Subject();

  constructor(private service: AdminApiService) {
    this.newRecipeAdded$ = this.newRecipeAdded.asObservable();
  }

  public getRecipes(): Observable<[ Recipe ]> {
    return this.service.getRecipes();
  }

  public notifyNewRecipe(): void {
    this.newRecipeAdded.next();
  }

  public createRecipe(recipeInfo: Recipe): Observable<boolean> {
    return this.service.createRecipe(recipeInfo);
  }

  public updateRecipe(recipeInfo: Recipe): Observable<boolean> {
    return this.service.updateeRecipe(recipeInfo);
  }

  public deleteRecipe(id: string): Observable<boolean> {
    return this.service.deleteRecipe(id);
  }


}
