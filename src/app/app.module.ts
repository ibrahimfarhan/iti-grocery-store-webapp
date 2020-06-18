import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
