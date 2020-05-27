import { Injectable } from '@angular/core';

import { Category } from './category';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl: string = '../assets/categories.json';

  constructor(private http : HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      tap(data => console.log('All Categories: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + `/${id}`).pipe(
      tap(data => console.log('getCategoryById: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(this.categoryUrl, category, { headers: headers }).pipe(
      tap(data => console.log('addCategory: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  deleteCategory(id: number): Observable<Category>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Category>(this.categoryUrl+`/${id}`, { headers: headers }).pipe(
      tap(() => console.log('deleteCategory: ' + id)),
      catchError(this.HandleError)
    );
  }

  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Category>(this.categoryUrl, category, { headers: headers }).pipe(
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
