import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { updatePhotographerDetail } from '../../../models/updatePhotographerDetails';
import { CustomerService } from '../../../services/customer.service';
import { PhotographerService } from '../../../services/photographer.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-photographer-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-photographer-details.component.html',
  styleUrl: './update-photographer-details.component.css'
})
export class UpdatePhotographerDetailsComponent {
  updatephotographerForm!: FormGroup;
  model!: updatePhotographerDetail;
  submitted = false;
  thisFile: File | undefined;
  profilePictureUrl: string='';
  photographer:any;
  token:string='';
  imageUrl: string | ArrayBuffer | null = null;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private photographerService: PhotographerService,
  ) {
    this.photographer = this.customerService.getPayloadFromToken();
    this.imageUrl= this.photographer.profilePicture;
    this.model = new updatePhotographerDetail();
  }

  ngOnInit() {
    this.updatephotographerForm = this.fb.group({
      email: [this.photographer.email || '', [Validators.required, Validators.email]],
      phone: [this.photographer.phoneNumber || '', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      firstName: [this.photographer.firstName || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: [this.photographer.lastName || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: [this.photographer.gender || '', Validators.required],
      city: [this.photographer.city || '', Validators.required],
      instaHandle: [this.photographer.instaHandle || ''],
      portfolioLink: [this.photographer.portfolioLink || ''],
      CameraUsed: [this.photographer.cameraUsed || ''],
      ProfilePicture: [''],
      
    });
   
  }
 updatePhotographer(){
    const formValues = this.updatephotographerForm.value;
    this.model.id=this.photographer.id;
    this.model.email = formValues.email;
    this.model.phoneNumber = formValues.phone;
    this.model.firstName = formValues.firstName;
    this.model.lastName = formValues.lastName;
    this.model.gender = formValues.gender;
    this.model.city = formValues.city;
    this.model.profilePicture= this.profilePictureUrl;
    this.model.instaHandle = formValues.instaHandle;
    this.model.portfolioLink = formValues.portfolioLink;
    this.model.cameraUsed = formValues.CameraUsed;
    this.photographerService.updatePhotograher(this.model).subscribe({
      next: (res)=>{
        this.token = res.token;
        if(this.token){
        this.customerService.setToken(this.token);
        window.location.reload();
        }
        this.snackBar.open(
          'Information successfully Updated',
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
        'Error Occur during Updation',
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
  }
  onSubmit() {
    this.submitted = true;
    if (this.updatephotographerForm.valid) {

      if(this.thisFile){
        console.log("uploading the file to the cloudinary");
        this.photographerService.uploadProfilePicture(this.thisFile).subscribe({
          next: (uploadResult: any) => {
          
            console.log("this is the upload result ",uploadResult.imageUrl);
            this.profilePictureUrl=uploadResult.imageUrl;
            this.updatePhotographer();
          
          },
          error: (err) => {
            console.log('Error uploading photo:', err);
          },
        });

      }else{
        if(this.photographer.profilePicture){
          this.profilePictureUrl= this.photographer.profilePicture;
        }
        this.updatePhotographer();
      
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
