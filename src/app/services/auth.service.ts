import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';

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
  private auth = inject(Auth);

  register(email: string, password: string, name: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        // Guardamos los datos del usuario para poder accederlos después
        localStorage.setItem('userName', name);
      });
  }

  logout(): Promise<void> {
    localStorage.removeItem('userName');
    return signOut(this.auth);
  }

  getCurrentUser(): Observable<any> {
    return authState(this.auth);
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      authState(this.auth).subscribe(user => {
        observer.next(!!user);
      });
    });
  }

  getToken(): string | null {
    // Firebase maneja tokens automáticamente
    return null;
  }
}
