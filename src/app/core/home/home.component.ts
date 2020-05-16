import { Component, OnInit } from '@angular/core';
import { Category } from './../../products/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  category: Category[]= [
    {id:1,name:"category1"},
    {id:2,name:"category2"},
    {id:3,name:"category3"},
    {id:4,name:"category4"},
    {id:5,name:"category5"},
    {id:6,name:"category6"},
    {id:7,name:"category7"},
    // {id:8,name:"category8"},
    // {id:9,name:"category9"},
    // {id:10,name:"category10"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
