import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PhotographerService } from '../../../services/photographer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  portfolio=false;
  portfolioLinks:any[]=[''];



  

constructor(private photographerService: PhotographerService){

}

ngOnInit(){
  this.photographerService.getPortfolioLinks().subscribe({
    next: (res)=>{
        this.portfolioLinks=res;
    }
    ,
    error: (err)=>{
      console.log("error retriving the data ");
    }
  })
  if(this.portfolioLinks){
    this.portfolio=true;
  }


 
}

encodeLink(link: string): string {
  return encodeURIComponent(link);
}
}
