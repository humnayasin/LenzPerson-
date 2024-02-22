import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotographerService } from '../../../services/photographer.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../../services/user-store.service';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { GallerySectionComponent } from "../../components/gallery-section/gallery-section.component";
import { CustomerSidebarComponent } from "../../components/customer-sidebar/customer-sidebar.component";
import { UpdateCustomerDetailsComponent } from "../update-customer-details/update-customer-details.component";
import { BookingRequestComponent } from "../booking-request/booking-request.component";
import { CustomerRequestsComponent } from "../customer-requests/customer-requests.component";

@Component({
    selector: 'app-customer-dashboard',
    standalone: true,
    templateUrl: './customer-dashboard.component.html',
    styleUrl: './customer-dashboard.component.css',
    imports: [RouterLink, HttpClientModule, CommonModule, GallerySectionComponent, CustomerSidebarComponent, UpdateCustomerDetailsComponent, BookingRequestComponent, CustomerRequestsComponent]
})
export class CustomerDashboardComponent implements OnInit{



    public photographers:any =[];
    name: string="";
    nameStyle = { color: '#47748b' };
    selectedPhotographer:any;
    settingVisibility=false;
    selectedComponent:string='';
    PhotographerVisibility=true;
    bookingVisibility=false;

  constructor(private router:Router, private customerServive: CustomerService, private photographerService: PhotographerService, private  userStore: UserStoreService, ){
 
  }
  onLinkClicked(component: string){
    
    this.selectedComponent = component;

    if (this.selectedComponent === 'setting') {
      this.bookingVisibility=false;
      this.PhotographerVisibility=false;
      this.settingVisibility=true;
    } else if(this.selectedComponent === 'booking'){
      this.PhotographerVisibility=false;
      this.settingVisibility=false;
      this.bookingVisibility=true;
    } else if(this.selectedComponent === 'photographer'){
      this.PhotographerVisibility=true;
      this.settingVisibility=false;
      this.bookingVisibility=false;

    }

  }
  ngOnInit(){
    this.photographerService.getAllPhotographers().subscribe(res=>{
    this.photographers= res;
    })
                                                   

    this.userStore.getNameFromStore().subscribe(res=>{
      let nameFromToken = this.customerServive.getNameFromToken();
      this.name=res.toUpperCase() || nameFromToken.toUpperCase();

    })
  }
  viewPortfolio(photographer:any):void{
    console.log("hello lets start ");
    this.selectedPhotographer=photographer;
    console.log("sent ", this.selectedPhotographer);
    this.router.navigate(['/portfolio', { photographerName: this.selectedPhotographer.firstName, LastName: this.selectedPhotographer.lastName, Id: this.selectedPhotographer.id }]);

  }


  
  
}
