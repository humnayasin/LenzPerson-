import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router'; // Correct import from '@angular/router'
import { ErrorHandlingService } from '../services/error-handling.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private customerService: CustomerService, private router: Router,  private errorService: ErrorHandlingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("in the auth interceptor ");
    const token = this.customerService.getToken();

    if (token) {
      // Clone the request and add the Authorization header with the token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorService.setErrorMessage('Email does not exist.');
        
        }
        else if (error.status===401){
          this.errorService.setErrorMessage('Invalid Email or Password.');

        }
        return throwError(error);
      })
    );
  }
}
