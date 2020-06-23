import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryInHomeComponent } from './category-in-home/category-in-home.component';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsModule } from '../products/products.module';
import { UserLinksComponent } from './user-links/user-links.component';
import { ErrorService } from '../services/error.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    UserLinksComponent,
    ShoppingCartComponent,
    CategoryInHomeComponent
  ],
  imports: [
    CommonModule,
    UsersModule,
    RouterModule,
    SharedModule,
    ProductsModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    UserLinksComponent,
    ShoppingCartComponent
  ],
})
export class CoreModule { }
