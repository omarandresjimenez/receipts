
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ItemChip } from 'src/app/core/models/models';

@Component({
  selector: 'app-new-element-card',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewElementFormComponent implements OnInit, OnChanges {
  public item: ItemChip = { name: '', description: '' };
  constructor() { }

  @Input()
  public title: string;

  @Input()
  public typeElement: string;

  @Output()
  public submitData = new EventEmitter<ItemChip>();


  ngOnInit(): void {
  }

  ngOnChanges() {

  }

  onCancel() {
    this.submitData.emit(null);
    this.item = { name: '', description: '' };
  }

  onSubmit() {
    this.submitData.emit(this.item);
    this.item = { name: '', description: '' };
  }

}
