import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { DetailPreparationComponent } from 'src/app/share/widgets/detail-prep-card/detail-prep-card.component';
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

   @Input()
   public card: Recipe;

   @Input()
   public userId: string;

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   @Output()
   public ratePreparation = new EventEmitter<{ id: string, comments: string, rating: number }>();

   public prep: Preparation;


   ngOnInit(): void {
   }

   ngOnChanges(): void {
    this.cdr.markForCheck();
   }

   onBack() {
     this.backCatalog.emit(true);
   }

   onModalOpen(prep: Preparation): void {
     this.prep = { ...prep };
     this.modalservice.open('custom-modal-1');
     this.cdr.markForCheck();
   }

   onCloseModal(modal) {
    this.prep = null;
    this.modalservice.close(modal);
   }

   onComment(objRating: any) {
     this.ratePreparation.emit({ id: objRating.id, comments: objRating.comments, rating: objRating.rating });
     this.cdr.markForCheck();
   }

}
