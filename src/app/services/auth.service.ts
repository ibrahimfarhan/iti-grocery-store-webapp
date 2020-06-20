import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  currentUser: any;

  // redirectUrl: string;

  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    return this.http.post(this.baseUrl + 'login', user).pipe(
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
  getCurrentUser(): Subject<any> {
    this.currentUserSubject.next(this.currentUser);
    return this.currentUserSubject;
  }
  // getDecodedToken(): any{
  //   const token = localStorage.getItem('authToken');
  //   this.decodedToken = JSON.parse(atob(token.split('.')[1]));
  //   return this.decodedToken;
  // }
  register(user: any) {
    return this.http.post(this.baseUrl + 'register', user).pipe(
      map((response) => {
        // the response is the returned user object
        this.currentUser = Object.assign({}, response);
        this.getCurrentUser();
      })
    );
  }
  // check the token to decide whether the user logged in or not
  isLogged(): boolean {
    const token = localStorage.getItem('authToken');
    // shorthand for if statement to return true or false
    return !!token;
  }

  //check if the current logged in user is an admin by checking the retrieved user role and by checking the role in the token
  isAdmin(): boolean {
    //add role property to user interface !!!
    if (this.decodedToken) {
      // return this.decodedToken['Admin'] && this.currentUser.role === 'Admin';
    }
    return false;
  }

  logout() {
    localStorage.removeItem('authToken');
    console.log('logged out');
    this.currentUserSubject.next(this.currentUser);
  }
}
