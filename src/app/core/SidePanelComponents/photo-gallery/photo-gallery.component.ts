import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PhotographerService } from '../../../services/photographer.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent {

  photographerForm: FormGroup;
  gallery: File[]=[];
  Display: string[]=[];
  Id!: number;
  photographer:any;

  
  constructor(private fb: FormBuilder, private photographerService: PhotographerService, private customerService: CustomerService) {
    this.photographerForm = this.fb.group({
      pictures: this.fb.array([this.createPictureControl()])
      
    });
    this.photographer = this.customerService.getPayloadFromToken();
    if(this.photographer){
      this.Id= this.photographer.id;
    }
  }

  ngOnInit(){
    this.photographerService.getGalleryImages(this.Id).subscribe({
      next: (res)=>{
        this.Display=res;
        console.log("i got the images ");
      }, 
      error: (err)=>{
        console.log(err);
      }
    })

  

  }
  get pictureControls(): FormArray {
    return this.photographerForm.get('pictures') as FormArray;
  }

  createPictureControl(): FormGroup {
    return this.fb.group({
      pictureFile: [null, Validators.required]  // Add required validator if needed
    });
  }

  addPicture(): void {
    this.pictureControls.push(this.createPictureControl());
  }

  removePicture(index: number): void {
    this.pictureControls.removeAt(index);
    console.log("index", index);
     // Remove from gallery array
  if (index >= 0 && index < this.gallery.length) {
    this.gallery.splice(index, 1);
    console.log("Removed picture at index", index);
  } else {
    console.error("Invalid index for gallery array");
  }

  console.log(this.gallery);
  }

  onSubmit(): void {
    this.photographerService.uploadGalleryPhotos(this.gallery).subscribe({
      next: (res)=>{
        console.log(res);
        alert("your Photoes successfully Uploaded");
        this.photographerForm.reset();
        this.photographerService.getGalleryImages(this.Id).subscribe({
          next: (res)=>{
            this.Display=res;
            console.log("i got the images ");
          }, 
          error: (err)=>{
            console.log(err);
          }
        })
      }, 
      error: (err)=>{
        console.log(err);
      }
    })
  }
  
 
  onFileChange(event: any, index: number) {
 
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.gallery.push(file);
      console.log(this.gallery);
 
    }
  }

  
}

    
  
