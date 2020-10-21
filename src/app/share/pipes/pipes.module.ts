import { NgModule } from '@angular/core';
import { TruncatePipe} from './limitTo.pipe';
import { CssUrlPipe} from './css-url.pipe';

@NgModule({
  imports: [],
  declarations: [
    TruncatePipe,
    CssUrlPipe,
  ],
  exports: [
    TruncatePipe,
    CssUrlPipe,
  ]
})
export class PipesModule{}
