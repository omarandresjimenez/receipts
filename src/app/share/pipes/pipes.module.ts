import { NgModule } from '@angular/core';
import { TruncatePipe} from './limitTo.pipe';

@NgModule({
  imports: [],
  declarations: [
    TruncatePipe
  ],
  exports: [
    TruncatePipe
  ]
})
export class PipesModule{}
