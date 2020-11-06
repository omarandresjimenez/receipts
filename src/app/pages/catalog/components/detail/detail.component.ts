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

   modName: string;
   modRegion: string;
   modAuthor: string;
   modImage: string;
   modRating: string;
   modIngredients: string[];
   modTools: string[];

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

   onModalOpen(prep: Preparation): any {
     this.modName = prep.name;
     this.modRegion = prep.region?.name;
     this.modAuthor = prep.author?.name + ' ' + prep.author?.lastName;
     this.modImage = prep.imageUrl;
     this.modRating = prep.rating?.toString();
     this.modIngredients =  prep.ingredients.map(i => i.name);
     this.modTools =  prep.tools.map(t => t.name);
     this.modalservice.open('custom-modal-1');
   }

   onCloseModal(modal) {
    this.modalservice.close(modal);
   }

}
