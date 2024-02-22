import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, RouterLink } from '@angular/router';
import { PhotographerComponent } from "../../components/photographer/photographer.component";
import { FeedbackFormComponent } from "../../components/feedback-form/feedback-form.component";
import { UserStoreService } from '../../../services/user-store.service';

@Component({
    selector: 'app-customer-requests',
    standalone: true,
    templateUrl: './customer-requests.component.html',
    styleUrl: './customer-requests.component.css',
    imports: [CommonModule, PhotographerComponent, FeedbackFormComponent]
})
export class CustomerRequestsComponent {


  custId:number=0;
  requests?:any[];
  pending?:any[];
  accepted?:any[];
  rejected?:any[];
  done?:any[];
  selectedId:number=0;
  selectedPId:number=0;
  selectedCId:number=0;
  open=false;
  feedbackIds:number[]=[];

  showfeedBackForm=false;
  customerName:string='';


  constructor(private bookingService:BookingService, private customerService: CustomerService,  private snackBar: MatSnackBar, private router: Router){

  }
fetchDate(){
  this.bookingService.getRequestedBookingsByCustId(this.custId).subscribe({
    next: (res)=>{
        this.requests=res;
        console.log("requests", this.requests);
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })

  this.bookingService.getPendingBookingsByCustId(this.custId).subscribe({
    next: (res)=>{
        this.pending=res;
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })

  this.bookingService.getAcceptedBookingsByCustId(this.custId).subscribe({
    next: (res)=>{
        this.accepted=res;     
    }
    ,
    error: (err)=>{
      console.log("error occured getting the requests for booking");
    }
  })
this.bookingService.getRejectedBookingsByCustId(this.custId).subscribe({
  next: (res)=>{
    this.rejected=res;
}
,
error: (err)=>{
  console.log("error occured getting the requests for booking");
}
})
this.bookingService.getDoneBookingsByCustId(this.custId).subscribe({
  next: (res)=>{
    this.done=res;
}
,
error: (err)=>{
  console.log("error occured getting the requests for booking");
}
})
this.bookingService.getFeedbackIds().subscribe({
  next: (res)=>{
    this.feedbackIds=res;
}
,
error: (err)=>{
  console.log("error occured getting the ids for feedback");
}
})

}
  ngOnInit(){
    this.custId=this.customerService.getIdFromToken();
    this.fetchDate();

   this.customerName= this.customerService.getNameFromToken();

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
        this.fetchDate();
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
  doneBookig(id:number){
  
    this.bookingService.DoneBooking(id).subscribe({
      next: (res)=>{
        window.location.reload();
        this.snackBar.open(
           'Successfully Marked as Done',
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
          'Error: Event is not completed yet',
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

  acceptRequest(id:number, pid:number){
    this.snackBar.open(
      'Wait a moment! your request is being processed!',
     'Close',

     {
       duration: 5000,
       horizontalPosition: 'end',
       verticalPosition: 'top',
       panelClass: 'custom-snackbar-warning',
     }
   );
  
    this.bookingService.AcceptBooking(id,pid).subscribe({
      next: (res)=>{
        window.location.reload();
        this.snackBar.open(
           'Successfully Accepted',
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
          'Error accepting the request',
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


  navigateToPhotographerDetails(id: number) {
  this.selectedId=id;
  if(this.open==true){
    this.open=false;

  }
  else{
    this.open=true;
  }
  }


  closeForm() {
    this.showfeedBackForm = false;
    window.location.reload();
  }
  giveFeedback(id:number,pid:number,cid:number){
    if(this.showfeedBackForm){

      this.showfeedBackForm = false;
    }
    else{
      this.showfeedBackForm = true;
    }
    console.log("feedbackformOpen");
      this.selectedId=id;
      this.selectedPId=pid;
      this.selectedCId=cid;
  
  }
}