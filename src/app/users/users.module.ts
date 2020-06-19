import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrdersModule } from './../orders/orders.module';




@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, UserProfileComponent],
  imports: [
  CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    OrdersModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UsersModule { }
