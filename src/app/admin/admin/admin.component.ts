import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productStatus:boolean = false;
  categoryStatus:boolean = false;
  constructor() { }

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
