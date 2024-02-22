import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotographerService } from '../../../services/photographer.service';
import { CommonModule } from '@angular/common';
import { BookingRequestComponent } from "../../pages/booking-request/booking-request.component";


@Component({
    selector: 'app-photographer-portfolio',
    standalone: true,
    templateUrl: './photographer-portfolio.component.html',
    styleUrl: './photographer-portfolio.component.css',
    imports: [CommonModule, BookingRequestComponent]
})
export class PhotographerPortfolioComponent {
  photographerName?: string;
  Lastname?:string;
  galleryImages: string[] = [];
  selectedItem?: string;
  feedback:any[]=[''];
  Id: number=0;
  constructor(private route: ActivatedRoute,private  photographerService:PhotographerService ) {}
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('photographerName');
    const lastName = this.route.snapshot.paramMap.get('LastName');
    const Id = this.route.snapshot.paramMap.get('Id');
   
    if (name) {
      this.photographerName = name;
    }
      if (lastName) {
      this.Lastname = lastName;
    }
      if (Id) {
      this.Id = Number(Id);
      this.fetchGalleryImages(this.Id);
      console.log()
    }


    this.photographerService.getFeedbackByPid(this.Id).subscribe({
      next: (res)=>{
          this.feedback= res;
          console.log("these are the feedbacks", res)
      },
      error: (err)=>{
        console.log("error occur getting the feedbacks");
      }
    })
  
  }
  fetchGalleryImages(id: number): void {
    this.photographerService.getGalleryImages(id)
      .subscribe(
        {
          next: (imageUrls: string[]) => {
            this.galleryImages = imageUrls;
            console.log('Gallery Images:', this.galleryImages);
      
          },
            error: (err)=>{
              console.error('Error fetching gallery images:', err);
            }
        }      
      );
  }


  openItem(itemID: string): void {
    this.selectedItem = itemID;
  }

  closeItem(): void {
    this.selectedItem = undefined;
  }
}