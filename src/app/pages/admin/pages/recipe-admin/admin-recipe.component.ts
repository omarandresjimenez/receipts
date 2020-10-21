import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../../core/models/models';


@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.scss']
})
export class AdminRecipeComponent implements OnInit {
  public recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
      console.log('init admin');
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipe = recipe;
  }
}
