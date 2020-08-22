import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RecipeCatalogService } from './services/recipe-catalog.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Recipe, Preparation } from 'src/app/models/models';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  public recipeCatalog$: Recipe[];


  public cardInfo: Recipe = null;
  public catalogView = true;
  private subs: Subscription[] = [];
  private set sub(sub: Subscription) { this.subs.push(sub); }

  constructor(private serviceCatalog: RecipeCatalogService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.serviceCatalog.searchRecipes('');
    this.serviceCatalog.getRecipesImages();

    this.sub =
    combineLatest([  this.serviceCatalog.recipeCatalog$, this.serviceCatalog.recipeImages$]).
       subscribe(([ res, images ]: [ Recipe[], string[]]) => {
        this.catalogView = true;
        this.recipeCatalog$ = [];
        res.map((x: Recipe) => {
         x.image = x.image ? x.image : images[ Math.floor(Math.random() * 10) ];
         x.preparations.map((prep) => prep.image = prep.image ? prep.image : images[ Math.floor(Math.random() * 10) ]);
         this.recipeCatalog$.push(x);
        });
        this.cdr.markForCheck();
      });
  }


  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onSelectCard(id: string) {
    // this.sub = this.serviceCatalog.getCastMovie(id).subscribe((res) => {
    //    this.casts.length = 0;
    //    this.casts = res;
          this.catalogView = false;
          this.cardInfo = this.recipeCatalog$.find((card) => card.id === id);
          this.cdr.markForCheck();
    //   });
  }

  onBack() {
    this.catalogView = true;
    this.cardInfo = null;
    // this.casts.length = 0;
  }
}
