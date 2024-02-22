import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { updateCustomerDetails } from '../../../models/updateCustomerDetails';
import { CustomerService } from '../../../services/customer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-customer-details.component.html',
  styleUrl: './update-customer-details.component.css'
})
export class UpdateCustomerDetailsComponent {
  submitted= false; 
  model!: updateCustomerDetails;
  updateForm!: FormGroup;
  token:string='';
  customer:any='';
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,

    private snackBar: MatSnackBar,
  ) {
    this.model = {
      id: 0,
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      gender: '',
      city: '',

    };
  }

  ngOnInit(): void {
    this.customer= this.customerService.getPayloadFromToken();
    this.updateForm = this.fb.group({
      email: [this.customer.email, [Validators.required, Validators.email]],
      phone: [this.customer.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      firstName: [this.customer.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: [this.customer.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: [this.customer.gender, Validators.required],
      city: [this.customer.city, Validators.required],
    });
    
  
  }
  
  onSubmit() {
    this.submitted = true;
    const formValues = this.updateForm.value;
    this.model.id=this.customer.id;
    this.model.email=formValues.email;
    this.model.phoneNumber=formValues.phone;
    this.model.firstName=formValues.firstName;
    this.model.lastName=formValues.lastName;
    this.model.gender=formValues.gender;
    this.model.city=formValues.city;
  
    if(this.updateForm.valid){
      console.log("here is the model", this.model)
      this.customerService.updateCustomer(this.model).subscribe({
        next: (res)=>{
          this.token = res.token;
          if(this.token){
          this.customerService.setToken(this.token);
          }
          window.location.reload();
          this.submitted=false;
          this.snackBar.open(
            'Successfully updated',
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
            'Error Occur during updation',
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
    }else{


      this.snackBar.open(
        'Invalid Information entered!',
        'Close',

        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar-warning',
        }
      );

    }
  

  }
  }



