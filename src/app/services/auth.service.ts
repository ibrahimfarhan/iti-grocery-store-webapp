import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { apiRoutes } from '../shared/configs/api-routes';
import { UserRole } from '../models/user-role';
import { ErrorService } from './error.service';
import { AUTH_TOKEN } from '../shared/configs/constants';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: User;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  getCurrentUserSubject(): BehaviorSubject<any> {

    this.fetchCurrentUser();
    return this.currentUserSubject;
  }

  fetchCurrentUser(): void {

    this.http.get<any>(apiRoutes.getCurrentUser, {observe: 'response'}).pipe(catchError(this.handleError)).
      subscribe(res => {

        if (res.ok && res.body) {
          this.currentUser = res.body as User;
          this.currentUserSubject.next(this.currentUser);
          this.isLoggedInSubject.next(true);
        }

        else {
          this.errorService.errorMessageSubject.next(res.body);
          localStorage.removeItem(AUTH_TOKEN);
          this.isLoggedInSubject.next(false);
        }
      });
  }

  register(user: User) {

    this.http.post<any>(apiRoutes.register, user, {observe: 'response'}).
      pipe(catchError(this.handleError)).
      subscribe(res => {

        if (res.ok) {
          this.currentUser = res.body as User;
          this.currentUserSubject.next(this.currentUser);
          this.router.navigate(['home']);
          this.isLoggedInSubject.next(true);
        }

        else {
          this.errorService.errorMessageSubject.next(res.body as string);
        }
      });
  }

  login(user: any) {

    return this.http.post<any>(apiRoutes.login, user, { observe: 'response'}).
      pipe(catchError(this.handleError)).
      subscribe(res => {

        if (res.ok) {

          this.currentUser = res.body as User;
          this.currentUserSubject.next(this.currentUser);
          localStorage.setItem(AUTH_TOKEN, this.currentUser.token);

          this.redirectUrl = this.redirectUrl ? this.redirectUrl : 'home';
          this.router.navigate([this.redirectUrl]);
          this.isLoggedInSubject.next(true);
        }

        else {
          this.errorService.errorMessageSubject.next(res.body as string);
        }
      });
  }

  isLoggedIn(): BehaviorSubject<boolean> {

    return this.isLoggedInSubject;
  }

  isAdmin(): boolean {

    return this.currentUser && this.currentUser.roles.includes(UserRole.Admin);
  }

  logout() {

    localStorage.removeItem(AUTH_TOKEN);
    this.currentUser = null;
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.isLoggedInSubject.next(false);
  }

  handleError = (err: HttpErrorResponse) => {

    this.errorService.errorMessageSubject.next(err.error);

    return throwError(err.error);
  }
}
