import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Recipe, Preparation } from 'src/app/core/models/models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

  constructor() { }

   @Input()
   public card: Recipe;

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   ngOnInit(): void {
   }

   onBack() {
     this.backCatalog.emit(true);
   }

}
