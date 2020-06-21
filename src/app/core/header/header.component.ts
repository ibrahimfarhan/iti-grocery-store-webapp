import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { ProductSearch } from 'src/app/models/productSearch';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLoggedIn: boolean;
  categories: string[];
  categoriesSub: Subscription;
  userSub: Subscription;

  constructor(public authService: AuthService, private router: Router,
              private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoriesSub = this.categoryService.getCategories()
      .subscribe(c => this.categories = c.map(cat => cat.name));
    this.userSub = this.authService.currentUserSubject.asObservable().subscribe(u => this.user = u);
    this.isLoggedIn = this.authService.isLogged();
  }

  handleSearch(productSearch: ProductSearch): void {
    this.productService.getProductsBySearchBar(productSearch);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }
}
