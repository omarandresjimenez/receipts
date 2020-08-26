import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from '../../../../core/models/models';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  public recipes$: Observable<Recipe[]>;

  constructor(private service: AdminService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef ) { }

  @Output()
  public editRecipe = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.recipes$ = this.service.getRecipes();
    this.service.newRecipeAdded$.subscribe(() => {
      this.recipes$ = this.service.getRecipes();
      this.cdr.markForCheck();
   });
  }

  onDelete($event: MouseEvent, id: string) {
    $event.stopPropagation();
    if (confirm('Esta seguro?')) {
      this.service.deleteRecipe(id).subscribe((res) => {
        this.toast.success('Receta eliminada!');
        this.recipes$ = this.service.getRecipes();
        this.cdr.markForCheck();
      });
    }
  }

  onEditRecipe(recipe: Recipe) {
      this.editRecipe.emit(recipe);
  }

}
