import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';



import { Ingredient, ItemChip, Preparation, Region, Tool } from 'src/app/core/models/models';
import { PreparationApiService } from '../api/admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  public newpreparationAdded$ = new Observable<Preparation>();
  private newpreparationAdded = new Subject<Preparation>();

  constructor(private service: PreparationApiService) {
    this.newpreparationAdded$ = this.newpreparationAdded.asObservable();
  }

  public getPreparations(userId: string): Observable<Preparation[]> {
    return this.service.getPreparationsByUser(userId);
  }

  public notifyNewpreparation(rec: Preparation): void {
    this.newpreparationAdded.next(rec);
  }

  public createPreparation(preparationInfo: Preparation): Observable<string> {
    return this.service.createPreparation(preparationInfo);
  }

  public updatePreparation(preparationInfo: Preparation): Observable<boolean> {
    return this.service.updatePreparation(preparationInfo);
  }

  public deletePreparation(id: string): Observable<boolean> {
    return this.service.deletePreparation(id);
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.service.getIngredients();
  }

  public getTools(): Observable<Tool[]> {
    return this.service.getTools();
  }

  public createIngredient(ingredientInfo: ItemChip): Observable<ItemChip> {
    return this.service.createIngredient(ingredientInfo);
  }

  public createTool(toolInfo: ItemChip): Observable<ItemChip> {
    return this.service.createTool(toolInfo);
  }
}
