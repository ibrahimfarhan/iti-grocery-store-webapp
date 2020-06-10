import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.component.html',
  styleUrls: ['./user-links.component.scss']
})
export class UserLinksComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Transform this into an observable subscription
    this.isLoggedIn = !this.authService.isLogged();
  }
}
