
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidaMailComponent } from './valida-mail.component';
import { ValidaMailProcessComponent } from './valida-mail-process.component';
import { ValidaMailRoutingModule } from './valida-email.routing.module';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    ValidaMailComponent,
    ValidaMailProcessComponent,
  ],
  imports: [
    CommonModule,
    ValidaMailRoutingModule,
    ToastrModule,
  ],
  providers: [],
  bootstrap: []
})
export class ValidateMailModule { }
