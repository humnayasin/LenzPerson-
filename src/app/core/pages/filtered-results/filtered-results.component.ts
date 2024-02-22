import { Component } from '@angular/core';
import { PhotographerDetails } from '../../../models/PhotographerDetails';
import { PhotographerFilteredDataService } from '../../../services/photographer-filtered-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtered-results.component.html',
  styleUrl: './filtered-results.component.css'
})
export class FilteredResultsComponent {
  photographers!: any[];
  selectedPhotographer:any;
  constructor(private filterService: PhotographerFilteredDataService, private router: Router){

  }

  ngOnInit(): void {
    this.filterService.getPhotographers().subscribe(photographers => {
      this.photographers = photographers;
    });
    console.log("photographer", this.photographers);
  }
  viewPortfolio(photographer:any):void{
    console.log("hello lets start ");
    this.selectedPhotographer=photographer;
    console.log("sent ", this.selectedPhotographer);
    this.router.navigate(['/portfolio', { photographerName: this.selectedPhotographer.firstName, LastName: this.selectedPhotographer.lastName, Id: this.selectedPhotographer.id }]);

  }


  }