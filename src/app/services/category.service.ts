import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Category } from '../models/category';
import { apiRoutes } from '../shared/configs/api-routes';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(apiRoutes.getCategories).pipe(
      catchError(this.handleError)
    );
  }

  getCategoryById(id: number): Observable<Category> {

    return this.getCategories().pipe(
      map((categories: Category[]) => categories.find(c => c.id === id))
    );
  }

  addCategory(category: Category): Observable<Category> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(apiRoutes.addCategory, category, { headers }).pipe(
      tap(data => console.log('addCategory: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<Category> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(apiRoutes.deleteCategory, { id } , { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(category: Category): Observable<Category> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(apiRoutes.editCategory, category, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {

    this.errorService.errorMessageSubject.next(err.error);

    return throwError(err.error);
  }
}
