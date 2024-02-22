import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CustomerDetail } from '../../../models/CustomerDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model!: CustomerDetail;
  submitted= false; 

  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
  ) {
    this.model = {
      id: 0,
      email: '',
      password: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      gender: '',
      city: '',
      userRole: '',
    };
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})[a-zA-Z0-9!@#$%^&*]+$')]],
      confirm_password: ['', [Validators.required, this.customValidator()]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
    });
       this.registerForm.get('password')?.valueChanges.subscribe(() => {
        this.registerForm.get('confirm_password')?.updateValueAndValidity();
      });

  }
  
  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log("validation check")
      const formGroup = control.parent as FormGroup;
  
      if (!formGroup) {
        return null;
      }
  
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirm_password');
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      const passwordsMatch = passwordControl.value === confirmPasswordControl.value;
  
      console.log('passwordsMatch:', passwordsMatch);
  
      return passwordsMatch ? null : { 'passwordMismatch': true };
    };
  }
  
  
  onSubmit() {
    this.submitted = true;
    const formValues = this.registerForm.value;
    // Assign form values to this.model
    if(this.registerForm.valid){

      this.model.email = formValues.email;
      this.model.password = formValues.password;
      this.model.phoneNumber = formValues.phone;
      this.model.firstName = formValues.firstName;
      this.model.lastName = formValues.lastName;
      this.model.gender = formValues.gender;
      this.model.city = formValues.city;
      this.model.userRole = 'Customer';
      this.customerService.addCustomer(this.model).subscribe({
        next: (response) => {
          console.log('user added to db successfully');
          this.snackBar.open(
            'User Succesfully registered',
            'Close',
    
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-warning',
            }
          );
          this.submitted=false;
    
          this.registerForm.reset();
        },
        error: (err) => {
          this.snackBar.open(
            'Error:'+ err.error,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-warning',
            }
          );
        },
      });
      




  
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
