import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Order } from './../../models/order';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  orders: Order[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUserSubject().asObservable().subscribe(u => {
      this.user = u;
    });
  }
}
