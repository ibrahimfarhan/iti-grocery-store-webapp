import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { apiRoutes } from '../shared/configs/api-routes';
import { UserRole } from '../models/userRole';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  currentUser: User;

  redirectUrl: string;

  decodedToken: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    return this.http.post(apiRoutes.login, user).pipe(
      map((response: any) => {
        const loginResponse = response;
        // the log in api response from server is an object contains two keys, token and logged user object
        // console.log(loginResponse);
        if (loginResponse) {
          localStorage.setItem('authToken', loginResponse.token);
          // making a shallow copy of the retrieved user from the server
          this.currentUser = Object.assign({}, loginResponse.user);
          this.getCurrentUser();

          this.decodedToken = JSON.parse(
            atob(loginResponse.token.split('.')[1])
          );
          console.log(this.decodedToken);
        }
      })
    );
  }

  getCurrentUser(): BehaviorSubject<any> {
    return this.currentUserSubject;
  }
  // getDecodedToken(): any{
  //   const token = localStorage.getItem('authToken');
  //   this.decodedToken = JSON.parse(atob(token.split('.')[1]));
  //   return this.decodedToken;
  // }
  register(user: User) {
    return this.http.post<HttpResponse<any>>(apiRoutes.register, user).
    subscribe(res => {
        if (res.ok) {
          this.currentUser = res.body as User;
          this.currentUserSubject.next(this.currentUser);
        }

        else {
          // TODO: Show an error message
        }
      });
  }
  // check the token to decide whether the user logged in or not
  isLogged(): boolean {
    const token = localStorage.getItem('authToken');
    // shorthand for if statement to return true or false
    return !!token;
  }

  // check if the current logged in user is an admin by checking the retrieved user role and by checking the role in the token
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === UserRole.Admin;
  }

  logout() {
    this.http.post(apiRoutes.logout, this.currentUser);
    localStorage.removeItem('authToken');
    console.log('logged out');
    this.currentUserSubject.next(this.currentUser);
  }
}
