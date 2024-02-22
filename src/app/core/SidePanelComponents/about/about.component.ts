import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { UserStoreService } from '../../../services/user-store.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  photographer:any;
  name: string="";
  nameStyle = { color: 'purple' };

  constructor(private customerService: CustomerService, private userStore: UserStoreService){
  }


  ngOnInit(){
   


    this.userStore.getNameFromStore().subscribe(res=>{
      let nameFromToken = this.customerService.getNameFromToken();
      this.name=res.toUpperCase() || nameFromToken.toUpperCase();

    })
   
     this.photographer = this.customerService.getPayloadFromToken();
    
  }



}
