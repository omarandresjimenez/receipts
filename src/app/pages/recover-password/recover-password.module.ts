
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordProcessComponent } from './recover-password-process.component';
import { RecoverPasswordRoutingModule } from './recover-password.routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    RecoverPasswordComponent,
    RecoverPasswordProcessComponent,
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    ToastrModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class RecoverPasswordModule { }
