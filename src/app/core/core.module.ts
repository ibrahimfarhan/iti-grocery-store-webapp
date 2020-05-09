import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryInHomeComponent } from './category-in-home/category-in-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, CategoryInHomeComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
