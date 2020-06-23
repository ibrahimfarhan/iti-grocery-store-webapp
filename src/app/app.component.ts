import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AUTH_TOKEN } from './shared/configs/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'grocery-store-webapp';
  userToken: any;
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      this.authService.fetchCurrentUser();
    }
  }
}
