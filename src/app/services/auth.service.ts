import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthError } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private currentTokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());
  public currentToken$ = this.currentTokenSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getTokenFromStorage());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initializeAuthState();
  }

  /**
   * Inicializa el estado de autenticación desde el almacenamiento local
   */
  private initializeAuthState(): void {
    const storedUser = this.getUserFromStorage();
    const storedToken = this.getTokenFromStorage();

    if (storedUser && storedToken) {
      this.currentUserSubject.next(storedUser);
      this.currentTokenSubject.next(storedToken);
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtiene el token actual
   */
  getCurrentToken(): string | null {
    return this.currentTokenSubject.value;
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login con email y contraseña
   * TODO: Conectar con Firebase Authentication
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulación de login - reemplazar con Firebase en producción
    return this.simulateLogin(credentials).pipe(
      tap(response => {
        this.setAuthState(response.user, response.token);
      }),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Registro de nuevo usuario
   * TODO: Conectar con Firebase Authentication
   */
  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    // Simulación de registro - reemplazar con Firebase en producción
    return this.simulateRegister(credentials).pipe(
      tap(response => {
        this.setAuthState(response.user, response.token);
      }),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Logout del usuario actual
   */
  logout(): Observable<void> {
    return new Observable(observer => {
      try {
        // TODO: Llamar a Firebase signOut cuando esté integrado
        this.clearAuthState();
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Actualiza el perfil del usuario
   * TODO: Conectar con Firebase
   */
  updateProfile(user: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => this.createAuthError('AUTH_ERROR', 'Usuario no autenticado'));
    }

    const updatedUser = { ...currentUser, ...user };
    return new Observable(observer => {
      try {
        this.setUserInStorage(updatedUser);
        this.currentUserSubject.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      } catch (error) {
        observer.error(this.handleError(error));
      }
    });
  }

  /**
   * Cambia la contraseña del usuario
   * TODO: Conectar con Firebase
   */
  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    if (!this.isAuthenticated()) {
      return throwError(() => this.createAuthError('AUTH_ERROR', 'Usuario no autenticado'));
    }

    return new Observable(observer => {
      try {
        // TODO: Validar contraseña antigua contra Firebase y cambiar en Firebase
        console.log('Cambio de contraseña - preparado para Firebase');
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(this.handleError(error));
      }
    });
  }

  /**
   * Recupera la contraseña del usuario
   * TODO: Conectar con Firebase
   */
  resetPassword(email: string): Observable<void> {
    return new Observable(observer => {
      try {
        if (!this.isValidEmail(email)) {
          throw this.createAuthError('INVALID_EMAIL', 'Correo electrónico inválido');
        }
        // TODO: Llamar a Firebase sendPasswordResetEmail
        console.log('Email de recuperación enviado:', email);
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(this.handleError(error));
      }
    });
  }

  /**
   * ===== MÉTODOS PRIVADOS =====
   */

  /**
   * Simulación de login
   */
  private simulateLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (this.isValidEmail(credentials.email) && credentials.password.length >= 6) {
          const user: User = {
            id: this.generateId(),
            email: credentials.email,
            firstName: 'Usuario',
            lastName: 'Demo',
            createdAt: new Date(),
          };
          const token = this.generateToken();
          observer.next({ user, token });
          observer.complete();
        } else {
          observer.error(
            this.createAuthError('INVALID_CREDENTIALS', 'Email o contraseña inválidos')
          );
        }
      }, 500);
    });
  }

  /**
   * Simulación de registro
   */
  private simulateRegister(credentials: RegisterCredentials): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (
          this.isValidEmail(credentials.email) &&
          credentials.password.length >= 6 &&
          credentials.firstName.length >= 2 &&
          credentials.lastName.length >= 2
        ) {
          const user: User = {
            id: this.generateId(),
            email: credentials.email,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            createdAt: new Date(),
          };
          const token = this.generateToken();
          observer.next({ user, token });
          observer.complete();
        } else {
          observer.error(
            this.createAuthError('INVALID_DATA', 'Datos de registro inválidos')
          );
        }
      }, 500);
    });
  }

  /**
   * Establece el estado de autenticación
   */
  private setAuthState(user: User, token: string): void {
    this.setUserInStorage(user);
    this.setTokenInStorage(token);
    this.currentUserSubject.next(user);
    this.currentTokenSubject.next(token);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Limpia el estado de autenticación
   */
  private clearAuthState(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.currentTokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Obtiene el usuario del almacenamiento local
   */
  private getUserFromStorage(): User | null {
    try {
      const user = localStorage.getItem('auth_user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario del almacenamiento:', error);
      return null;
    }
  }

  /**
   * Guarda el usuario en el almacenamiento local
   */
  private setUserInStorage(user: User): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  /**
   * Obtiene el token del almacenamiento local
   */
  private getTokenFromStorage(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Guarda el token en el almacenamiento local
   */
  private setTokenInStorage(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Valida formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Maneja errores de autenticación
   */
  private handleError(error: any): Observable<never> {
    let authError: AuthError;

    if (error && error.code && error.message) {
      authError = error;
    } else if (error?.code) {
      authError = error;
    } else {
      authError = this.createAuthError('UNKNOWN_ERROR', 'Error desconocido en autenticación');
    }

    console.error('Error de autenticación:', authError);
    return throwError(() => authError);
  }

  /**
   * Crea un objeto AuthError
   */
  private createAuthError(code: string, message: string): AuthError {
    return { code, message };
  }

  /**
   * Genera un ID único
   */
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Genera un token simulado
   */
  private generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 50)}`;
  }
}
