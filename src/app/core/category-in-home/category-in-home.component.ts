import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../products/category';

@Component({
  selector: 'app-category-in-home',
  templateUrl: './category-in-home.component.html',
  styleUrls: ['./category-in-home.component.scss']
})
export class CategoryInHomeComponent implements OnInit {

  constructor() { }

  @Input() category:Category;
  ngOnInit(): void {
  }

}
