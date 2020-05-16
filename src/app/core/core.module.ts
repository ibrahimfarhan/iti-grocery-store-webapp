import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryInHomeComponent } from './category-in-home/category-in-home.component';
import { UsersModule } from '../users/users.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, CategoryInHomeComponent, ShoppingCartComponent],
  imports: [
    CommonModule,
    UsersModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
