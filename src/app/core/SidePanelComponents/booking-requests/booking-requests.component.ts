import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { OfferFormComponent } from "../offer-form/offer-form.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-booking-requests',
    standalone: true,
    templateUrl: './booking-requests.component.html',
    styleUrl: './booking-requests.component.css',
    imports: [CommonModule, OfferFormComponent]
})
export class BookingRequestsComponent {
  photographerId:number=0;
  requests?:any[];
  pending?:any[];
  accepted?:any[];
  rejected?:any[];
  done?:any[];
  showOfferForm = false;
  selectedId:number=0;
  constructor(private bookingService: BookingService, private customerService: CustomerService, private snackBar: MatSnackBar){

  }
fetchData(){
  this.bookingService.getRequestedBookings(this.photographerId).subscribe({
    next: (res)=>{
        this.requests=res;
        console.log("requests", this.requests);
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })

  this.bookingService.getPendingBookings(this.photographerId).subscribe({
    next: (res)=>{
        this.pending=res;
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })
  this.bookingService.getRejectedBookings(this.photographerId).subscribe({
    next: (res)=>{
        this.rejected=res;
       
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })

  this.bookingService.getAcceptedBookings(this.photographerId).subscribe({
    next: (res)=>{
        this.accepted=res;     
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })  
  this.bookingService.getDoneBookings(this.photographerId).subscribe({
    next: (res)=>{
        this.done=res;     
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })
}
  ngOnInit(){
    this.photographerId=this.customerService.getIdFromToken();
    this.fetchData();

  }
  closeForm() {
    this.showOfferForm = false;
    window.location.reload();
  }
  openOfferForm(id:number){
    this.selectedId=id;
    this.showOfferForm = true;
    
  }

  rejectRequest(id:number){
    this.bookingService.RejectingBooking(id).subscribe({
      next: (res)=>{
        window.location.reload();
        this.snackBar.open(
          'Cancelled Successfully',
          'Close',
  
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-warning',
          }
        );
      },
      error: (err)=>{
        this.snackBar.open(
          'Error Cancelling the request',
          'Close',
  
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-warning',
          }
        );
      
      }
    })
  }


  deleteRequest(id:number){
    this.bookingService.deletedBookings(id).subscribe({
      next: (res)=>{
        window.location.reload();
        this.snackBar.open(
           'Successfully Deleted',
          'Close',
  
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-warning',
          }
        );
      },
      error: (err)=>{
        this.snackBar.open(
          'Error deleting the request',
          'Close',
  
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-warning',
          }
        );
     
      }
    })
  }


  
}
