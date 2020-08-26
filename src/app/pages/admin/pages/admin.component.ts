import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../core/models/models';


@Component({
  selector: 'app-admin-container',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminContainerComponent implements OnInit {
  public recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
      console.log('init admin');
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipe = recipe;
  }
}
