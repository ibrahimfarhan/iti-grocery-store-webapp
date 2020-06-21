import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

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
    const token = localStorage.getItem('authToken');
    if (token) {
    }
  }

}
