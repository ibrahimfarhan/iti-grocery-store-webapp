import { Component, OnInit } from '@angular/core';
import { AuthService } from './users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userToken:any;
  user:any;
  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.decodedToken = JSON.parse(atob(token.split('.')[1]));
    }
    
  }
}
