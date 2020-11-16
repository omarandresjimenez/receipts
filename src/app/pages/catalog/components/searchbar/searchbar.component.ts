import { Component, OnInit } from '@angular/core';
import { RecipeCatalogService } from '../../services/recipe-catalog.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  rating = '1+';
  constructor(private service: RecipeCatalogService) { }

  ngOnInit(): void {
  }

  onSearch($event, value: string) {
    $event.preventDefault();
    this.service.searchRecipes(value.trim());
  }

  filerByRating(val) {
    this.rating = val.toString() + '+';
    this.service.setRatingFilter(val);
  }
}
