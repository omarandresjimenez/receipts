import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailRecipeComponent implements OnInit, OnChanges {
  public showComments = false;
  constructor(private modalservice: ModalService,
              private cdr: ChangeDetectorRef ) { }

   public modInfo: {
                    modId: string;
                    modName: string;
                    modRegion: string;
                    modAuthor: string;
                    modAuthor_imageUrl: string;
                    modImage: string;
                    modRating: string;
                    modIngredients: string[];
                    modTools: string[];
                    modSteps: string;
                    modCarrier: string;
                    modCooking: string;
                    modSale: boolean;
                    modType: string;
                    modSource: string;
                   };

    public rating: {
                   rating: number;
                   comments: string;
                  } = { rating: 0, comments: ''};

    public rated = false;

   @Input()
   public card: Recipe;

   @Input()
   public userId: string;

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   @Output()
   public ratePreparation = new EventEmitter<{ id: string, comments: string, rating: number }>();

   ngOnInit(): void {
     this.showComments = !!this.userId;
   }

   ngOnChanges(): void {
    this.cdr.markForCheck();
   }

   onBack() {
     this.backCatalog.emit(true);
   }

   onModalOpen(prep: Preparation): void {
     this.modInfo = {
                     modId: prep.id,
                     modName: prep.name,
                     modRegion: prep.region?.name,
                     modAuthor: prep.author?.name + ' ' + prep.author?.lastName,
                     modAuthor_imageUrl: prep.author?.imageUrl,
                     modImage: prep.imageUrl,
                     modSteps: prep.preparationSteps,
                     modCarrier: prep.carrierCommunity,
                     modCooking: prep.cookingTechnique.name,
                     modSale: prep.forSale,
                     modType: prep.preparationType,
                     modSource: prep.source,
                     modRating: prep.rating?.toString(),
                     modIngredients:  prep.ingredients.map(i => i.name),
                     modTools: prep.tools.map(t => t.name),
                     };
     this.rating = { rating: 0, comments: ''};
     this.modalservice.open('custom-modal-1');
     this.cdr.markForCheck();
   }

   onCloseModal(modal) {
    this.modalservice.close(modal);
   }

   onComment() {
     this.ratePreparation.emit({ id: this.modInfo.modId, comments: this.rating.comments, rating: this.rating.rating });
     this.showComments = false;
     this.rated = true;
     this.cdr.markForCheck();
   }

}
