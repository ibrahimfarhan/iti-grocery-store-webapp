import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/models/userRole';

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.component.html',
  styleUrls: ['./user-links.component.scss']
})
export class UserLinksComponent implements OnInit {

  isLoggedIn: boolean;
  currentUser: User;
  userSub: Subscription;
  isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    this.userSub = this.authService.getCurrentUser().asObservable().subscribe(u => {
      this.currentUser = u;
      this.isAdmin = this.currentUser && this.currentUser.role === UserRole.Admin;
    });
  }

  onLogoutClick(): void {
    this.userSub.unsubscribe();
    this.authService.logout();
  }
}
