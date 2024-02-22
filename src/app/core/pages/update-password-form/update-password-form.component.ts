import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { updatePassword } from '../../../models/updatePasswords';
import { CustomerService } from '../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-update-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css'
})
export class UpdatePasswordFormComponent {
  model!: updatePassword;
  submitted= false; 
  Id:number=0;
  payload:any='';
  UpdatePasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router:Router ,
  ) {
    this.model = {
      OldPassword:'',
      NewPassword: ''
    };

    this.payload= this.customerService.getPayloadFromToken();
    if(this.payload){

      this.Id= this.payload.id;
    }

  }

  ngOnInit(): void {
    this.UpdatePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})[a-zA-Z0-9!@#$%^&*]+$')
        ]
      ],
      confirm_password: ['', [Validators.required, this.customValidator()]]
    });
    this.UpdatePasswordForm.get('newPassword')?.valueChanges.subscribe(() => {
      this.UpdatePasswordForm.get('confirm_password')?.updateValueAndValidity();
    });
  
    // Subscribe to value changes of confirm_password
    this.UpdatePasswordForm.get('newPassword')?.valueChanges.subscribe(() => {
      this.UpdatePasswordForm.get('confirm_password')?.updateValueAndValidity();
    });
  }
  
  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup; // Assuming this control is part of a FormGroup
  
      if (!formGroup) {
        return null;  // Controls not found, validation passes
      }
  
      const passwordControl = formGroup.get('newPassword');
      const confirmPasswordControl = formGroup.get('confirm_password');
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;  // Controls not found, validation passes
      }
  
      const passwordsMatch = passwordControl.value === confirmPasswordControl.value;
  
      return passwordsMatch ? null : { 'passwordMismatch': true };
    };
  }
  
  onSubmit() {
    this.submitted = true;

    const formValues = this.UpdatePasswordForm.value;
    if(this.UpdatePasswordForm.valid){


      this.model.OldPassword=formValues.oldPassword,
      this.model.NewPassword=formValues.newPassword


      this.customerService.updatePassword(this.Id, this.model).subscribe({
        next: (res)=>{
          console.log("Password is successfully updated ")
          this.submitted=false;
          this.snackBar.open(
            'Password Successfully Updated',
            'Close',
    
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-success',
            }
          );
          this.customerService.removeToken();
          this.router.navigate(['user/login']);

        },
        error: (err)=>{
          console.log(err);
          this.snackBar.open(
              "Old Password is Incorrect",
            'Close',
    
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-error',
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

