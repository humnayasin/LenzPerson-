import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhotographerDetails } from '../models/PhotographerDetails';

@Injectable({
  providedIn: 'root'
})
export class PhotographerFilteredDataService {
  private photographerSubject :  BehaviorSubject<PhotographerDetails[]>=new BehaviorSubject<PhotographerDetails[]>([]);
  public photographers$: Observable<PhotographerDetails[]> = this.photographerSubject.asObservable();

  constructor() { }

  setPhotographers(photographers: PhotographerDetails[]): void {
    this.photographerSubject.next(photographers);
  }

  getPhotographers(): Observable<PhotographerDetails[]> {
    return this.photographers$;
  }
}
