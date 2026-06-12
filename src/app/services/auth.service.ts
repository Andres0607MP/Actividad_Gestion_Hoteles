import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<AuthUser | null>(null);
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      this.currentUser$.next(JSON.parse(savedUser));
      this.isLoggedIn$.next(true);
    }
  }

  login(email: string, password: string): Observable<AuthUser> {
    // Mock login - en producción sería Firebase
    const user: AuthUser = {
      id: Math.random().toString(),
      email,
      name: email.split('@')[0],
      role: 'user'
    };

    return of(user).pipe(
      delay(1000),
      // No usar tap aquí para mantener puro
    );
  }

  register(name: string, email: string, password: string): Observable<AuthUser> {
    const user: AuthUser = {
      id: Math.random().toString(),
      email,
      name,
      role: 'user'
    };

    return of(user).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    this.currentUser$.next(null);
    this.isLoggedIn$.next(false);
  }

  setCurrentUser(user: AuthUser): void {
    this.currentUser$.next(user);
    this.isLoggedIn$.next(true);
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('authToken', 'mock-token-' + Date.now());
  }

  getCurrentUser(): Observable<AuthUser | null> {
    return this.currentUser$.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
