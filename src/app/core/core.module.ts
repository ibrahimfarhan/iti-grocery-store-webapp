import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryInHomeComponent } from './category-in-home/category-in-home.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, CategoryInHomeComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
