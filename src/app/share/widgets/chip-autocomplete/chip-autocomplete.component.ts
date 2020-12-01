import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import { ItemChip } from 'src/app/core/models/models';


/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-chip-autocomplete',
  templateUrl: 'chip-autocomplete.component.html',
  styleUrls: ['chip-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipAutocompleteComponent implements OnChanges, OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<ItemChip[]>;
  items: ItemChip[] = [];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input()
  public titleItem = 'Seleccione';

  @Input()
  public listItems: ItemChip[];

  @Input()
  public initialListItems: ItemChip[] = [];

  @Input()
  public typeItem: string;

  @Output()
  public itemsSelected = new EventEmitter<ItemChip[]>();


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.listItems) {
      this.filteredItems = this.itemCtrl.valueChanges.pipe(
        // tslint:disable-next-line: deprecation
        startWith(null),
        map((word: string | null) => word ? this._filter(word) : this.listItems.slice()));
      }
    if (changes.initialListItems) {
        this.items = [ ...this.initialListItems ];
      }
  }


  remove(itemId: string): void {
    const index = this.items.findIndex(i => i.id === itemId);

    if (index >= 0) {
      this.items.splice(index, 1);
      this.itemsSelected.emit(this.items);
      this.cdr.markForCheck();
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.itemInput.nativeElement.blur();
    this.cdr.markForCheck();
  }

  selectItem($event, item: ItemChip) {
      if ($event.isUserInput &&
        this.items.indexOf(item) < 0) {
        this.items.push(item);
        this.itemsSelected.emit(this.items);
      }
  }

  private _filter(value: string): ItemChip[] {
    const filterValue = value.toLowerCase();
    return this.listItems.filter(item => item.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}
