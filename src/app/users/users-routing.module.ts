import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileGuard } from '../guards/user-profile.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    {path: 'register', component: RegisterComponent,canActivate:[AuthGuard]},
    {path: 'user-profile/:id', component: UserProfileComponent
    //  ,canActivate: [UserProfileGuard]
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsersRoutingModule { }
