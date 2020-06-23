import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../models/category';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from 'src/app/models/user-role';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  isAdmin: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

    this.authService.getCurrentUserSubject().pipe(map(u => u && u.roles.includes(UserRole.Admin))).
    subscribe(i => this.isAdmin = i);
  }

}
