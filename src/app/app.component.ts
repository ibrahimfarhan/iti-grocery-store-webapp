import { Component, OnInit } from '@angular/core';
import { AuthService } from './users/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grocery-store-webapp';

  log(){
    console.log('aa');
  }
}
