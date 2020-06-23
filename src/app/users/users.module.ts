import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrdersModule } from './../orders/orders.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    UserProfileComponent
  ],
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
