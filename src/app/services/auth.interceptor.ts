import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  // Get the auth token
  const token = authService.getCurrentToken();

  // If token exists, add it to the Authorization header
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } else {
    // Even without token, set Content-Type
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401, clear auth state
      if (error.status === 401) {
        authService.logout().subscribe();
      }
      return throwError(() => error);
    })
  );
};

