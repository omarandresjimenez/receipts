
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { Preparation } from 'src/app/core/models/models';
import { UserModel } from 'src/app/core/models/UserModel';

@Component({
  selector: 'app-prep-card',
  templateUrl: './prep-card.component.html',
  styleUrls: ['./prep-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationCardComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  public preparation: Preparation;

  @Input()
  public author: UserModel;

  @Output()
  public updatePrep = new EventEmitter<Preparation>();

  @Output()
  public deletePrep = new EventEmitter<string>();

  ngOnInit(): void {
  }

  ngOnChanges() {

  }

  onUpdatePreparation() {
    this.updatePrep.emit(this.preparation);
  }

  onDeletePreparation() {
    if (confirm('Esta seguro que desea eliminar esta preparación?')){
      this.deletePrep.emit(this.preparation.id);
    }
  }

}
