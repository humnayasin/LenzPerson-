import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.css'
})
export class CustomerSidebarComponent {
  @Output() linkClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor(private customerService: CustomerService, private router: Router ){

  }

  HandleLinkClicked(component:string){
    this.linkClicked.emit(component);
    
  }



    handleClick(event: MouseEvent ) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.toggle('active');
      }
    }
    logout(){
      console.log("logout button is pressed");
    try {
    

        this.customerService.removeToken();
        console.log("token has been removed ");
        this.router.navigate(['user/login'])
      }
     catch (error) {
      console.error('Error occurred while logging out:', error);
    }
    }
  
  }


