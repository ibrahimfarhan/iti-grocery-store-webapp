import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { LogoComponent } from './logo/logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ErrorService } from '../services/error.service';

@NgModule({
  declarations: [
    DropdownMenuComponent,
    LogoComponent,
    PaginationComponent,
    SearchBarComponent
  ],
  exports: [
    DropdownMenuComponent,
    LogoComponent,
    PaginationComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class SharedModule { }
