import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Recipe, Preparation } from 'src/app/core/models/models';
import { ModalService } from 'src/app/share/widgets/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

  constructor(private modalservice: ModalService) { }

   modName: string;
   modRegion: string;
   modAuthor: string;
   modImage: string;
   modRating: string;
   modIngredients: any[];

   @Input()
   public card: Recipe;

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   ngOnInit(): void {
   }

   onBack() {
     this.backCatalog.emit(true);
   }

   onModalOpen(prep): any {
     this.modName = prep.name;
     this.modRegion = prep.region;
     this.modAuthor = prep.author;
     this.modImage = prep.image;
     this.modRating = prep.rating;
     this.modIngredients =  prep.ingredients;
     this.modalservice.open('custom-modal-1');
   }

   onCloseModal(modal) {
    this.modalservice.close(modal);
   }

}
