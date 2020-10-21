import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { SignUpFormModule } from './widgets/signupform/sign-up-form.module';
import { AppModalModule } from './widgets/modal/modal.module';
import { AvatarModule } from './widgets/avatar/avatar.module';
import { HeaderModule } from './widgets/header/header.module';

@NgModule({
 imports: [
     PipesModule,
     AppModalModule,
     SignUpFormModule,
     AvatarModule,
     HeaderModule,
 ],
  exports: [
    PipesModule,
    AppModalModule,
    SignUpFormModule,
    AvatarModule,
    HeaderModule,
  ]
})
export class ShareModule {

}
