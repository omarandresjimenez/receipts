import { Component, OnInit } from '@angular/core';
import { Preparation } from 'src/app/core/models/models';


@Component({
  selector: 'app-admin-preparation',
  templateUrl: './admin-preparation.component.html',
  styleUrls: ['./admin-preparation.component.scss']
})
export class AdminPreparationComponent implements OnInit {
  public preparation: Preparation;
  constructor() { }

  ngOnInit(): void {
   console.log('admin prep');
  }

  onPreparationSelected(preparation: Preparation) {
    this.preparation = preparation;
  }
}
