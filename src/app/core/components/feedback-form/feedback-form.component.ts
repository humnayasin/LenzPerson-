import { Component, EventEmitter, Input, Output } from '@angular/core';
import { feedback } from '../../../models/feedback';
import { BookingService } from '../../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent {
  @Output() closeFormEvent = new EventEmitter<void>();
  @Input() bookingid: number = 0;
  @Input() photographerid: number = 0;
  @Input() customerid: number = 0;
  @Input() Name: string = '';
  FeedBackForm!: FormGroup;
  submitted = false;
  model: feedback; // Declare model variable without initialization

  constructor(private bookingService: BookingService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.model = new feedback(0,0, 0, '', ''); 
  }

  ngOnInit(): void {
    console.log("bookingid:", this.bookingid);
    this.FeedBackForm = this.fb.group({
      feedback: ['', Validators.required]
    });
  }

  onsubmit() {
    this.submitted = true;
    const formValues = this.FeedBackForm.value;
    if (this.FeedBackForm.valid) {

      this.model.PId = this.photographerid;
      this.model.BId = this.bookingid;
      this.model.CId = this.customerid;
      this.model.CName = this.Name;
      this.model.Comment = formValues.feedback;
      this.bookingService.addFeedback(this.model).subscribe({
        next: (res)=>{
          this.snackBar.open(
            'feedback Succesfully Received',
            'Close',
            
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-warning',
            }
            );
            this.closeFormEvent.emit();
  
        },
        error: (err)=>{
          this.snackBar.open(
            'You have already given the feedback ',
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