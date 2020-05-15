import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';
import { User, retrievedUser } from 'src/app/users/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:retrievedUser ;
  isLogged:boolean;
  userDataSubscription:any;

  constructor(public authService: AuthService, private router:Router) { 
    
  }

  ngOnInit(): void {

    
    this.authService.currentUserSubject.asObservable().subscribe( data => {
      console.log(data);
      this.user = data;
      // console.log(this.user);
      this.isLogged = this.authService.isLogged();
    });
    
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
