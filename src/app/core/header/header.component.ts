import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user';
import { AuthService } from 'src/app/users/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:User ;
  isLogged:boolean;

  constructor(public authService: AuthService, private router:Router) { 
    this.authService.currentUserSubject.asObservable().subscribe( data => {
      console.log(data);
      this.user = data;
      // console.log(this.user);
      this.isLogged = this.authService.isLogged();
    });
  }

  ngOnInit(): void {
      
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
