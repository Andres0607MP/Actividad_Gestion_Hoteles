import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Firebase maneja la autenticación automáticamente
    // Este interceptor no es necesario para Firebase
    return next.handle(req);
  }
}

export const authInterceptor = (req: HttpRequest<any>, next: any) => {
  // Firebase maneja la autenticación automáticamente
  return next(req);
};
