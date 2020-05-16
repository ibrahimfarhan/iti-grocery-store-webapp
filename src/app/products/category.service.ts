import { Injectable } from '@angular/core';

import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { id: 0, name: 'Cat-1' },
    { id: 1, name: 'Cat-2' },
    { id: 2, name: 'Cat-3' },
    { id: 3, name: 'Cat-4' },
    { id: 4, name: 'Cat-5' },
  ];

  constructor() { }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(id: number) {
    const cat =  this.categories.find(
      (c) => c.id === id
    )
    let copyCat: Category = {id: cat.id, name: cat.name};
    return copyCat;
  }
}
