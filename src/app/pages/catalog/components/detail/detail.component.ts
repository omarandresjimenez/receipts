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

  constructor(private modalservice: ModalService,
              private cdr: ChangeDetectorRef ) { }

   public modInfo: {
                    modName: string;
                    modRegion: string;
                    modAuthor: string;
                    modAuthor_imageUrl: string;
                    modImage: string;
                    modRating: string;
                    modIngredients: string[];
                    modTools: string[];
                    modSteps: string;
                   };

   @Input()
   public card: Recipe;

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   ngOnInit(): void {
   }

   ngOnChanges(): void {
    this.cdr.markForCheck();
   }

   onBack() {
     this.backCatalog.emit(true);
   }

   onModalOpen(prep: Preparation): void {
     this.modInfo = {
                     modName: prep.name,
                     modRegion: prep.region?.name,
                     modAuthor: prep.author?.name + ' ' + prep.author?.lastName,
                     modAuthor_imageUrl: prep.author?.imageUrl,
                     modImage: prep.imageUrl,
                     modSteps: prep.preparationSteps,
                     modRating: prep.rating?.toString(),
                     modIngredients:  prep.ingredients.map(i => i.name),
                     modTools: prep.tools.map(t => t.name),
                     };
     this.modalservice.open('custom-modal-1');
     this.cdr.markForCheck();
   }

   onCloseModal(modal) {
    this.modalservice.close(modal);
   }

}
