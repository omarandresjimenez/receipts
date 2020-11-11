import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastNoAnimation,
        ToastNoAnimationModule,
        ToastrService} from 'ngx-toastr';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/sign-up.component';

import { AppRoutingModule } from './app.routing.module';
import { SignUpFormModule } from './share/widgets/signupform/sign-up-form.module';
import { PipesModule } from './share/pipes/pipes.module';
import { HeaderModule } from './share/widgets/header/header.module';
import { JwtInterceptor } from './core/utils/jwt.interceptor';
import { LandingComponent } from './pages/landing/landing.component';
import { AppModalModule } from './share/widgets/modal/modal.module';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    CoreModule,
    SignUpFormModule,
    HeaderModule,
    PipesModule,
    AppModalModule,
    ToastNoAnimationModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
