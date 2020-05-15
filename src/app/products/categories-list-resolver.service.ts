import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Category } from './category';
import { CategoryService } from './category.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesListResolver implements Resolve<Category[]> {
    constructor(private categoryService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Category[]>
        | Promise<Category[]> | Category[] {
        return this.categoryService.getCategories();
    }
}
