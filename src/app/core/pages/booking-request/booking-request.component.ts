import { Component, Input } from '@angular/core';
import { BookingRequest } from '../../../models/BookingRequest';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-booking-request',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-request.component.html',
  styleUrl: './booking-request.component.css'
})
export class BookingRequestComponent {
  @Input() photographerId: number=0;

  customerId:number=0;
  model!:BookingRequest;
  bookingForm!: FormGroup;
  submitted=false;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private bookingService: BookingService
  ) {
  
    
  
  }

  ngOnInit(): void {
    // Initialize the BookingRequest model with default values
    this.model = new BookingRequest(0, 0, new Date(), new Date(), '');
    this.customerId=this.customerService.getIdFromToken();
    console.log("this is the id", this.customerId);
    
    // Create the form group
    this.bookingForm = this.fb.group({
      startTime: ['', [Validators.required, this.dateShouldBeFutureValidator()]],
      endTime: ['', [Validators.required, this.dateShouldBeFutureValidator()]],
      eventDetails: ['', Validators.required]
    });
  }
  dateShouldBeFutureValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        return { 'dateShouldBeFuture': true };
      }
      return null;
    };
  }
  submitBookingForm(){
    this.submitted=true;
    const formValues= this.bookingForm.value;
    if(formValues.endTime>=formValues.startTime){

    
    if(this.bookingForm.valid){

      this.model.photographerID=this.photographerId;
      this.model.customerID=this.customerId;
      this.model.startTime=formValues.startTime;
      this.model.endTime=formValues.endTime;
      this.model.eventDetails=formValues.eventDetails;
      
      this.bookingService.createBookinRequest(this.model).subscribe({
        next: (res)=>{
          this.bookingForm.reset();
          this.submitted=false;
          this.snackBar.open(
            'Booking Request Succesfully received! Now wait for the photographer Response',
            'Close',
            
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-success',
          }
        );
      },
      error: (err)=>{
        this.snackBar.open(
          'Request Declined! '+  err.error,
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
  else{
    alert("end time should be greater than start time ")
  }
  }
}
