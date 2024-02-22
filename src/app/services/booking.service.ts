import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingRequest } from '../models/BookingRequest';
import { Observable } from 'rxjs';
import { BookingDetails } from '../models/BookingDetails';
import { offer } from '../models/offer';
import { feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
private bookingRequestUrl= "https://localhost:7249/api/Booking/BookingRequest"
private GetRequestUrl= "https://localhost:7249/api/Booking/GetRequestedBooking"
private GetRequestUrlByCust= "https://localhost:7249/api/Booking/GetRequestedBookingByCustId"
private GetPendingUrl= "https://localhost:7249/api/Booking/GetPendingBooking"
private GetPendingUrlByCust= "https://localhost:7249/api/Booking/GetPendingBookingByCustId"
private GetAcceptedUrl= "https://localhost:7249/api/Booking/GetAcceptedBooking"
private GetAcceptedUrlByCust= "https://localhost:7249/api/Booking/GetAcceptedBookingByCustId"
private GetRejectedUrl= "https://localhost:7249/api/Booking/GetRejectedBooking"
private GetRejectedUrlByCust= "https://localhost:7249/api/Booking/GetRejectedBookingByCustId"
private DeleteBookingUrl="https://localhost:7249/api/Booking/DeleteBooking"
private AcceptBookingUrl="https://localhost:7249/api/Booking/AcceptBooking"
private RejectBooking="https://localhost:7249/api/Booking/rejectBooking"
private doneBooking="https://localhost:7249/api/Booking/doneBooking"
private getDoneBooking="https://localhost:7249/api/Booking/GetdoneBooking"
private getDoneBookingCustID="https://localhost:7249/api/Booking/GetdoneBookingByCust"
private addChargesUrl="https://localhost:7249/api/Booking/AddCharges"
private addFeedbackUrl="https://localhost:7249/api/Booking/GiveFeedBack"
private getFeedbackIdsUrl="https://localhost:7249/api/Booking/GetIdHavingFeedBack"
  constructor(private http: HttpClient) { }


  createBookinRequest(model: BookingRequest):Observable<void>{
    return this.http.post<void>(this.bookingRequestUrl, model); 
  }
  deletedBookings(bookingId: number): Observable<void> {
    const url = `${this.DeleteBookingUrl}?bookingId=${bookingId}`;
    return this.http.delete<void>(url);
  }

  AcceptBooking(bookingId: number, photographerId: number): Observable<void> {
    const url = `${this.AcceptBookingUrl}?bookingId=${bookingId}&photographerId=${photographerId}`;
    return this.http.put<void>(url, {});
  } 
  DoneBooking(bookingId: number): Observable<void> {
    const url = `${this.doneBooking}?bookingId=${bookingId}`;
    return this.http.put<void>(url, {});
  }
  RejectingBooking(bookingId: number): Observable<void> {
    const url = `${this.RejectBooking}?bookingId=${bookingId}`;
    return this.http.put<void>(url, {});
  }

  getAcceptedBookings(photographerId: number):Observable<BookingDetails[]>{
    const url=`${this.GetAcceptedUrl}?PhotographerId=${photographerId}`
    return this.http.get<BookingDetails[]>(url);
  }    
  getAcceptedBookingsByCustId(Id: number):Observable<BookingDetails[]>{
    const url=`${this.GetAcceptedUrlByCust}?Id=${Id}`
    return this.http.get<BookingDetails[]>(url);
  }  
  getRejectedBookings(photographerId: number):Observable<BookingDetails[]>{
    const url=`${this.GetRejectedUrl}?PhotographerId=${photographerId}`
    return this.http.get<BookingDetails[]>(url);
  } 
   getDoneBookings(photographerId: number):Observable<BookingDetails[]>{
    const url=`${this.getDoneBooking}?PhotographerId=${photographerId}`
    return this.http.get<BookingDetails[]>(url);
  }   
  getRejectedBookingsByCustId(Id: number):Observable<BookingDetails[]>{
    const url=`${this.GetRejectedUrlByCust}?Id=${Id}`
    return this.http.get<BookingDetails[]>(url);
  } 

   getPendingBookings(photographerId: number):Observable<BookingDetails[]>{
    const url=`${this.GetPendingUrl}?PhotographerId=${photographerId}`
    return this.http.get<BookingDetails[]>(url);
  }  
   getPendingBookingsByCustId(Id: number):Observable<BookingDetails[]>{
    const url=`${this.GetPendingUrlByCust}?Id=${Id}`
    return this.http.get<BookingDetails[]>(url);
  } 
   getDoneBookingsByCustId(Id: number):Observable<BookingDetails[]>{
    const url=`${this.getDoneBookingCustID}?Id=${Id}`
    return this.http.get<BookingDetails[]>(url);
  }
 getRequestedBookings(photographerId: number):Observable<BookingRequest[]>{
    const url=`${this.GetRequestUrl}?PhotographerId=${photographerId}`
    return this.http.get<BookingRequest[]>(url);
  } 
  getRequestedBookingsByCustId(Id: number):Observable<BookingRequest[]>{
    const url=`${this.GetRequestUrlByCust}?Id=${Id}`
    return this.http.get<BookingRequest[]>(url);
  }
  addCharges(model:offer):Observable<void>{
    return this.http.post<void>(this.addChargesUrl, model);
  } 
  addFeedback(model:feedback):Observable<void>{
    return this.http.post<void>(this.addFeedbackUrl, model);
  }
  getFeedbackIds(): Observable<number[]> {
    return this.http.get<number[]>(this.getFeedbackIdsUrl);
  }

}
