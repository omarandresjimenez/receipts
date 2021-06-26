import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';

@Component({
  selector: 'app-detail-prep-card',
  templateUrl: './detail-prep-card.component.html',
  styleUrls: ['./detail-prep-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPreparationComponent implements OnInit, OnChanges {
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
                    modSteps: string[];
                    modCarrier: string;
                    modCooking: string;
                    modSale: boolean;
                    modType: string;
                    modSource: string;
                    modDescription: string;
                    modUse: string;
                    modTransmissionWay: string;
                   };

    public rating: {
                   rating: number;
                   comments: string;
                  } = { rating: 0, comments: ''};

    public rated = false;


   @Input()
   public userId: string;

   @Input()
   public prep: Preparation;

   @Output()
   public ratePreparation = new EventEmitter<{ id: string, comments: string, rating: number }>();

   @Output()
   public closeButton = new EventEmitter<boolean>();

   ngOnInit(): void {
     this.showComments = !!this.userId;
   }

   ngOnChanges(): void {
    if (this.prep) {
    this.modInfo = {
      modId: this.prep.id,
      modName: this.prep.name,
      modRegion: this.prep.region?.name,
      modAuthor: this.prep.author?.name + ' ' + this.prep.author?.lastName,
      modAuthor_imageUrl: this.prep.author?.imageUrl,
      modImage: this.prep.imageUrl,
      modSteps: this.prep.preparationSteps?.replace(/\n/g, '   ').split('   '),
      modCarrier: this.prep.carrierCommunity,
      modCooking: this.prep.cookingTechnique?.name,
      modSale: this.prep.forSale,
      modType: this.prep.preparationType,
      modSource: this.prep.source?.trim(),
      modRating: this.prep.rating?.toString(),
      modIngredients:  this.prep.ingredients.map(i => i.name),
      modTools: this.prep.tools.map(t => t.name),
      modDescription: this.prep.description,
      modUse: this.prep.use,
      modTransmissionWay: this.prep.transmissionWay,
      };
    this.rating = { rating: 0, comments: ''};
    this.cdr.markForCheck();
    }
   }

   onCloseModal() {
    this.closeButton.emit(true);
   }

   onComment() {
     this.ratePreparation.emit({ id: this.modInfo.modId, comments: this.rating.comments, rating: this.rating.rating });
     this.showComments = false;
     this.rated = true;
     this.modInfo = { ...this.modInfo, modRating: this.rating.rating.toString()};
     this.cdr.markForCheck();
   }

}
