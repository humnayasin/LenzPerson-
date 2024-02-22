import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotographerService } from '../../../services/photographer.service';
import { PhotographerDetails } from '../../../models/PhotographerDetails';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-photographer-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './photographer-register.component.html',
  styleUrl: './photographer-register.component.css',
})
export class PhotographerRegisterComponent {
  photographerForm!: FormGroup;
  model!: PhotographerDetails;
  submitted = false;
  thisFile: File | undefined;
  profilePictureUrl: string='';


  constructor(
    private fb: FormBuilder,
    private photographerService: PhotographerService,
    private snackBar: MatSnackBar,
    private customerService: CustomerService
  ) {
    this.model = new PhotographerDetails();
  }

  ngOnInit() {
    this.photographerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})[a-zA-Z0-9!@#$%^&*]+$'
          ),
        ],
      ],
      confirm_password: ['', [Validators.required, this.customValidator()]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      instaHandle: [''],
      portfolioLink: [''],
      CameraUsed: [''],
      PreferredPhotoshootTypes: [[]],
      ProfilePicture: [''],
      UserRole: 'Photographer',
    });
    this.photographerForm.get('password')?.valueChanges.subscribe(() => {
      this.photographerForm.get('confirm_password')?.updateValueAndValidity();
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
  passwordMatchValidator(
    control: AbstractControl
  ):
    | Promise<{ [key: string]: boolean } | null>
    | Observable<{ [key: string]: boolean } | null> {
    return new Promise((resolve) => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;

      if (password !== confirmPassword) {
        resolve({ passwordMismatch: true });
      } else {
        resolve(null);
      }
    });
  }




  registerPhotographer(){

    this.model.PreferredPhotoshootTypes = ['birthday', 'wedding'];
    const formValues = this.photographerForm.value;
    this.model.email = formValues.email;
    this.model.password = formValues.password;
    this.model.phone = formValues.phone;
    this.model.firstName = formValues.firstName;
    this.model.lastName = formValues.lastName;
    this.model.gender = formValues.gender;
    this.model.city = formValues.city;
    this.model.ProfilePicture= this.profilePictureUrl;
    this.model.UserRole = 'Photographer';
    this.model.instaHandle = formValues.instaHandle;
    this.model.portfolioLink = formValues.portfolioLink;
    this.model.cameraUsed = formValues.cameraUsed;
    this.model.cameraUsed = formValues.CameraUsed;
    this.photographerService.addPhotographer(this.model).subscribe({
      next: (response) => {
        console.log('User added to db successfully');
        this.submitted = false;
        this.snackBar.open(
          'User Successfully Registered!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar-warning',
          }
        );
        this.photographerForm.reset();
        this.imageUrl = null;
      },
      error: (err) => {
        console.log('Error:', err.error);
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
      }
    });
    // this.customerService.isEmailExists(this.model.email).subscribe({
    //   next: (exists) => {
    //     if (exists) {
    //       alert('Email already exists');
    //     } else {
    //       // If email doesn't exist, proceed with adding the photographer
        
    //     }
    //   },
    //   error: (err) => {
    //     console.log('Error checking email existence', err);
    //   },
    // });
    
}
  onSubmit() {
    this.snackBar.open(
      'Wait! Working on your Request',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar-warning',
      }
    );
    this.submitted = true;
    if (this.photographerForm.valid) {

      const preferredPhotoshootTypes = this.photographerForm.get(
        'PreferredPhotoshootTypes'
      )?.value;

      if(this.thisFile){
        console.log("uploading the file to the cloudinary");

        this.photographerService.uploadProfilePicture(this.thisFile).subscribe({
          next: (uploadResult: any) => {
          
            console.log("this is the upload result ",uploadResult.imageUrl);
            this.profilePictureUrl=uploadResult.imageUrl;
            this.registerPhotographer();
          
          },
          error: (err) => {
            console.log('Error uploading photo:', err);
          },
        });
      }else{
        this.registerPhotographer();
      }

    } else {
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

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    this.thisFile = event.target.files[0];

    if (this.thisFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.thisFile);
      
    }

  }
}
