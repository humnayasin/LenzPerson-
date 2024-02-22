import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  photographer:any;


  @Output() linkClicked: EventEmitter<string> = new EventEmitter<string>();

constructor(private customerService: CustomerService, private router:Router){

}
ngOnInit(){
  this.photographer = this.customerService.getPayloadFromToken();
  
}

  handleClick(event: MouseEvent ) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }
HandleLinkClicked(componentName: string) {
    this.linkClicked.emit(componentName);
}
logout() {
    console.log("logout button is pressed");
    try {
    
      this.customerService.removeToken();

      
        console.log("token has been removed ");
        this.router.navigate(['user/login']);
      }
     catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  }
}



