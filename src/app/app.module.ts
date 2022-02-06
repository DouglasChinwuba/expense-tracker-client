import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,

    
    SignupComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, StorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
