import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    const user = this.auth.currentUser;

    if (user && user.email?.includes('admin')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}