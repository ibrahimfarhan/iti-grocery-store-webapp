import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUSer, User, retrievedUser } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<retrievedUser> = new BehaviorSubject<
    retrievedUser
  >({
    id: null,
    userName: '',
    email: '',
    passwordHash: '',
    passwordSalt: '',
  });

  currentUser: any;

  // redirectUrl: string;

  baseUrl: string = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginUSer) {
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) => {
        const loginResponse = response;
        // the log in api response from server is an object contains two keys, token and logged user object
        // console.log(loginResponse);
        if (loginResponse) {
          localStorage.setItem('authToken', loginResponse.token);
          // method for making a shallow copy of the retrieved user from the server
          this.currentUser = Object.assign({}, loginResponse.user);
          this.getCurrentUser();

          this.decodedToken = JSON.parse(
            atob(loginResponse.token.split('.')[1])
          );
          // console.log(this.decodedToken);
        }
      })
    );
  }
  getCurrentUser() {
    this.currentUserSubject.next(this.currentUser);
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'register', user);
  }
  // check the token to decide whether the user logged in or not
  isLogged(): boolean {
    const token = localStorage.getItem('authToken');
    // shorthand for if statement to return true or false
    return !!token;
  }

  logout() {
    localStorage.removeItem('authToken');
    console.log('logged out');
    this.currentUserSubject.next(this.currentUser);
  }
}
