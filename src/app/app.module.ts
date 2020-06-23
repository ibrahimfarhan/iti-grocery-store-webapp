import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { ErrorService } from './services/error.service';
import { AuthService } from './services/auth.service';
import { AuthenticationInterceptor, AuthenticationInterceptorProvider } from './interceptors/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ErrorInterceptorProvider, AuthenticationInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
