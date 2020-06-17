import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  productStatus:boolean = false;
  categoryStatus:boolean = false;
  constructor() {
   }

  ngOnInit(): void {

  }
  productToggleArrow(){
    this.productStatus = !this.productStatus;       
    console.log(this.productStatus);
  }

  categoryToggleArrow(){
    this.categoryStatus = !this.categoryStatus;       
    console.log(this.categoryStatus);
  }

}
