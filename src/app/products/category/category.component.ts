import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../models/category';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
