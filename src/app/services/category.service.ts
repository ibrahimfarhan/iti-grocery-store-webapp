import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = '../assets/categories.json';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      catchError(this.HandleError)
    );
  }

  // getCategoryById(id: number): Observable<Category> {
  //   return this.http.get<Category>(this.categoryUrl + `/${id}`).pipe(
  //     tap(data => console.log('getCategoryById: ' + JSON.stringify(data))),
  //     catchError(this.HandleError)
  //   );
  // }

  //lama est5dmt eli fo2 da msh rady ygeeb l category msh 3rfa leh 
  //bs eli t7t da shghal 3ady w 3amal kda brdo m3 l products wel orders

  getCategoryById(id: number): Observable<Category> {
    return this.getCategories().pipe(
      map((categories: Category[]) => categories.find(c => c.id === id))
    );
  }

  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(this.categoryUrl, category, { headers }).pipe(
      tap(data => console.log('addCategory: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  deleteCategory(id: number): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Category>(this.categoryUrl + `/${id}`, { headers }).pipe(
      tap(() => console.log('deleteCategory: ' + id)),
      catchError(this.HandleError)
    );
  }

  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Category>(this.categoryUrl, category, { headers }).pipe(
      tap(() => console.log('updateCategory: ' + category.id)),
      map(() => category),
      catchError(this.HandleError)
    );
  }

  HandleError(err: HttpErrorResponse) {
    // console and throw error
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
