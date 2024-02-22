import { Component, Input } from '@angular/core';
import { PhotographerService } from '../../../services/photographer.service';
import { PhotographerDetails } from '../../../models/PhotographerDetails';

@Component({
  selector: 'app-photographer',
  standalone: true,
  imports: [],
  templateUrl: './photographer.component.html',
  styleUrl: './photographer.component.css'
})
export class PhotographerComponent {


  @Input() Id: number=0;
photographer!: any;
  constructor(private photographerService: PhotographerService){


  }
  ngOnInit(){
this.photographerService.getPhotographerById(this.Id).subscribe({
  next: (res)=>{
    this.photographer=res;
    console.log("photograherDetails", res);
  }, 
  error: (err)=>{
    console.log(err);
  }
})


  }

}
