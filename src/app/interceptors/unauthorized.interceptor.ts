import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(e => {
        if (request.method == 'POST' || request.method == 'PUT') {
          if (e instanceof HttpResponse && e.status == 200) {
          }
        }
      }),
      catchError((error) => {
        console.log(error.status);
        if (error.status === 401) {
          if (this.authService.getIsAuth()) {
            // this.authService.logout();
            console.log(error)
          }
        }
        return throwError(error);
      })
    );
  }
}
