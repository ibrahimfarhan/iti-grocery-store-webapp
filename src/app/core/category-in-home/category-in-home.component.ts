import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-in-home',
  templateUrl: './category-in-home.component.html',
  styleUrls: ['./category-in-home.component.scss']
})
export class CategoryInHomeComponent implements OnInit {

  constructor() { }

  @Input() category: Category;
  ngOnInit(): void {
  }

}
