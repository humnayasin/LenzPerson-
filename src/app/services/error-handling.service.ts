import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }



  private errorMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }

  setErrorMessage(message: string | null): void {
    this.errorMessageSubject.next(message);
  }
}

