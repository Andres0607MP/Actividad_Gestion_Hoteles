import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  login(email: string, password: string): Observable<User> {
    const user: User = {
      id: '1',
      name: 'Admin Usuario',
      email: email,
      role: 'admin',
      createdAt: new Date()
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    this.currentUserSubject.next(user);
    // TODO: Firebase - Integrar Firebase Auth
    return of(user).pipe(delay(500));
  }

  register(name: string, email: string, password: string): Observable<User> {
    const user: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: 'user',
      createdAt: new Date()
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    this.currentUserSubject.next(user);
    // TODO: Firebase - Integrar Firebase Auth
    return of(user).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    // TODO: Firebase - Cerrar sesión en Firebase
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
