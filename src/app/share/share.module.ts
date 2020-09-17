import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { AppModalModule } from './widgets/modal/modal.module';

@NgModule({
 imports: [
     PipesModule,
     AppModalModule,
 ],
  exports: [
    PipesModule,
    AppModalModule,
  ]
})
export class ShareModule {

}
