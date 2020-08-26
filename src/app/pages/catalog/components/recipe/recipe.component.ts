import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/core/models/models';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit {

  constructor() { }

   @Input()
   public card: Recipe;

   @Output()
   public selectedCard = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSelect(id: string) {
    this.selectedCard.emit(id);
  }
}
