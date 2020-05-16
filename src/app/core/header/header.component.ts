import { Component, OnInit } from '@angular/core';
import { retrievedUser } from 'src/app/users/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:retrievedUser ;
  isLogged:boolean;
  userDataSubscription:any;

  constructor() { 
    
  }

  ngOnInit(): void {
      
  }

  

}
