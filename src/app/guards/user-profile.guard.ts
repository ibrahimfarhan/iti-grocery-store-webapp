import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let userId: string;
    this.authService.currentUserSubject.asObservable().subscribe(data => {
      userId = data.id;
    });

    if (!(this.authService.isLogged() && next.params.id === userId)) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
