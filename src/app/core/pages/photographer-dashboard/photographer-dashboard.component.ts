import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { UserStoreService } from '../../../services/user-store.service';
import { PhotographerService } from '../../../services/photographer.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AboutComponent } from "../../SidePanelComponents/about/about.component";
import { PortfolioBuilderComponent } from "../../SidePanelComponents/portfolio-builder/portfolio-builder.component";
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from "../../SidePanelComponents/portfolio/portfolio.component";
import { PhotoGalleryComponent } from "../../SidePanelComponents/photo-gallery/photo-gallery.component";
import { UpdatePhotographerDetailsComponent } from "../update-photographer-details/update-photographer-details.component";
import { BookingRequestsComponent } from "../../SidePanelComponents/booking-requests/booking-requests.component";

@Component({
    selector: 'app-photographer-dashboard',
    standalone: true,
    templateUrl: './photographer-dashboard.component.html',
    styleUrl: './photographer-dashboard.component.css',
    imports: [SidebarComponent, AboutComponent, PortfolioBuilderComponent, CommonModule, PortfolioComponent, PhotoGalleryComponent, UpdatePhotographerDetailsComponent, BookingRequestsComponent]
})
export class PhotographerDashboardComponent implements OnInit{
    name: string="";
    email:string="";
    nameStyle = { color: 'purple' };
    photographer:any;

    selectedComponent: string = '';

    aboutVisibility = true;
    portfolioBuilderVisibility= false;
    portfolioVisibility= false;
    photoGalleryVisibility=false;
    SettingVisibility=false;
    clientManagementVisibility=false;


   
  
    onLinkClicked(componentName: string) {
      this.selectedComponent = componentName;

      if (this.selectedComponent === 'about') {
        this.aboutVisibility  = true;
        this.portfolioBuilderVisibility = false;
        this.portfolioVisibility= false;
        this.photoGalleryVisibility=false;
        this.SettingVisibility=false;
        this.clientManagementVisibility=false;

        
     
    } else if (this.selectedComponent === 'portfolioBuilder') {
    
        this.portfolioBuilderVisibility = true;
        this.aboutVisibility  = false;
        this.portfolioVisibility= false;
        this.photoGalleryVisibility=false;
        this.SettingVisibility=false;
        this.clientManagementVisibility=false;
        
      
    }
    else if(this.selectedComponent === 'portfolio'){
      
      
      this.portfolioBuilderVisibility = false;
      this.aboutVisibility  = false;
      this.portfolioVisibility= true;
      this.photoGalleryVisibility=false;
      this.SettingVisibility=false;
      this.clientManagementVisibility=false;
        
    } 
    else if(this.selectedComponent === 'photoGallery'){
      
      
      this.portfolioBuilderVisibility = false;
      this.aboutVisibility  = false;
      this.portfolioVisibility= false;
      this.photoGalleryVisibility=true;
      this.SettingVisibility=false;
      this.clientManagementVisibility=false;
        
    }   
    else if(this.selectedComponent === 'setting'){
      
      
      this.SettingVisibility=true;
      this.portfolioBuilderVisibility = false;
      this.aboutVisibility  = false;
      this.portfolioVisibility= false;
      this.photoGalleryVisibility=false;
      this.clientManagementVisibility=false;
        
    }
    else if(this.selectedComponent === 'clientManagement'){
      
      this.clientManagementVisibility=true;
      
      this.SettingVisibility=false;
      this.portfolioBuilderVisibility = false;
      this.aboutVisibility  = false;
      this.portfolioVisibility= false;
      this.photoGalleryVisibility=false;

        
    }
    
  }




  constructor(private customerService: CustomerService, private router:Router, private userStore: UserStoreService){
  }


  ngOnInit(){
   


    this.userStore.getNameFromStore().subscribe(res=>{
      let nameFromToken = this.customerService.getNameFromToken();
      this.name=res.toUpperCase() || nameFromToken.toUpperCase();

    })
    this.userStore.getEmailFromStore().subscribe(res=>{
      let emailFromToken = this.customerService.getEmailFromToken();
      this.email=res || emailFromToken.toUpperCase();
      
    })
     this.photographer = this.customerService.getPayloadFromToken();
    
  }


  


}
