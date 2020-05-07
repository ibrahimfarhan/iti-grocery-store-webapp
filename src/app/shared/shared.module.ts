import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { LogoComponent } from './logo/logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [DropdownMenuComponent, LogoComponent, SearchBarComponent, PaginationComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
