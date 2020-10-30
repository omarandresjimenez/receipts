import { Component, HostBinding, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: [ './bottom-bar.component.scss' ],
})
export class BottomBarComponent {
  @HostBinding('class.opened')
  public isOpened = false;

  @Input()
  public textOpen = 'Ver detalles';

  @Input()
  public textClose = 'Ocultar detalles';

  public constructor() {}

  public onToggle(): void {
    this.isOpened = !this.isOpened;
  }


}
