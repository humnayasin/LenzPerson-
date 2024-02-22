import { Component, EventEmitter, Input, Output } from '@angular/core';
import { offer } from '../../../models/offer';
import { BookingService } from '../../../services/booking.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './offer-form.component.html',
  styleUrl: './offer-form.component.css'
})
export class OfferFormComponent {
  @Output() closeFormEvent = new EventEmitter<void>();
  @Input() bookingid: number=0; 
  offerForm!:FormGroup;
  submitted=false;
    model!:offer
    constructor(private bookingService: BookingService, private fb: FormBuilder, private snackBar: MatSnackBar,){
      this.model = {
        bookingid:this.bookingid,
        charges:0
      }
    
    }
    ngOnInit(): void {
      console.log("bookingid:", this.bookingid);
      this.offerForm= this.fb.group({
          charges:['', Validators.required]
      })

    }


onsubmit(){
  this.submitted=true;
  const formValues = this.offerForm.value;
  if(this.offerForm.valid){
    this.model.charges=formValues.charges;
    this.model.bookingid=this.bookingid;
    this.bookingService.addCharges(this.model).subscribe({
      next: (res)=>{
        this.closeFormEvent.emit();
        this.snackBar.open(
          'Charges Succesfully Sent To Customer',
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
        this.closeFormEvent.emit();
        this.snackBar.open(
          'Error occur in responding the request! Try Again',
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
  
closeForm() {
  console.log("event emiited");
  this.closeFormEvent.emit();
}
}

