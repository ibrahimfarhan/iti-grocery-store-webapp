import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/models/user-role';

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

    this.authService.isLoggedIn().subscribe(i => this.isLoggedIn = i);
    this.userSub = this.authService.getCurrentUserSubject().subscribe(u => {
      this.currentUser = u;
    });
    this.authService.isAdmin().subscribe(i => this.isAdmin = i);
  }

  onLogoutClick(): void {

    this.userSub.unsubscribe();
    this.authService.logout();
  }
}
