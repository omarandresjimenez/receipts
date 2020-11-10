import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RecipeCatalogService } from './services/recipe-catalog.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { map } from 'rxjs/operators';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { UserSessionService } from 'src/app/core/services/session.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  public recipeCatalog$: Recipe[];
  public recipeTotal: Recipe[];

  public currentUserId: string;
  public cardInfo: Recipe = null;
  public catalogView = true;
  private subs: Subscription[] = [];

  private currentPage = 1;

  private readonly NUM_RECIPES = 20;

  private set sub(sub: Subscription) { this.subs.push(sub); }

  constructor(private serviceCatalog: RecipeCatalogService,
              private userSession: UserSessionService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.serviceCatalog.searchRecipes('');
    this.serviceCatalog.getRecipesImages();
    this.currentUserId = this.userSession.getCurrentUser()?.id;
    this.sub =
    combineLatest([  this.serviceCatalog.recipeCatalog$, this.serviceCatalog.recipeImages$]).
       subscribe(([ res, images ]: [ Recipe[], string[]]) => {
        this.catalogView = true;
        this.recipeCatalog$ = [];
        this.recipeTotal = [];
        res.map((x: Recipe) => {
         x.imageUrl = x.imageUrl ? x.imageUrl : images[ Math.floor(Math.random() * 10) ];
         // x.preparations.map((prep) => prep.imageUrl = prep.imageUrl ? prep.imageUrl : images[ Math.floor(Math.random() * 10) ]);
         this.recipeTotal.push(x);
        });
        this.currentPage = 1;
        this.recipeCatalog$ = this.recipeTotal.slice(0, this.NUM_RECIPES);
        this.cdr.markForCheck();
      });
  }


  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  showMoreRecipes(): void {
    this.currentPage++;
    this.recipeCatalog$ = this.recipeTotal.slice(0, this.NUM_RECIPES * this.currentPage);
    this.cdr.markForCheck();
  }

  onSelectCard(id: string) {
          this.cardInfo = this.recipeCatalog$.find((card) => card.id === id);
          this.sub = combineLatest([  this.serviceCatalog.getPreparationsByRecipe(this.cardInfo.id), this.serviceCatalog.recipeImages$]).
              subscribe(([ res, images ]: [ Preparation[], string[]]) => {
                this.cardInfo.preparations = res.map((prep: Preparation) => {
                                              return { ...prep, imageUrl : prep.imageUrl ?
                                                       prep.imageUrl : images[ Math.floor(Math.random() * 10) ] };
                                              });
                this.catalogView = false;
                this.cdr.markForCheck();
              });
  }

  onBack() {
    this.catalogView = true;
    this.cardInfo = null;
  }

  onRatePreparation($rateObj): void {
     this.serviceCatalog.ratePreparation(+this.currentUserId, $rateObj.id, $rateObj.comments, $rateObj.rating)
        .subscribe(() => {
          this.serviceCatalog.getRatingPreparation($rateObj.id).subscribe(r => {
            this.cardInfo.preparations =
              this.cardInfo.preparations.map((prep: Preparation) => {
                return { ...prep, rating: prep.id ===  $rateObj.id ? r : prep.rating };
              });
            this.cardInfo = { ...this.cardInfo };
            this.cdr.markForCheck();
            });
        });
     this.toast.success('Gracias por su valoración');
  }
}
