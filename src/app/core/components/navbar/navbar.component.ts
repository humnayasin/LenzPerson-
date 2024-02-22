
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PhotographerService } from '../../../services/photographer.service';
import { Router } from '@angular/router';
import { PhotographerFilteredDataService } from '../../../services/photographer-filtered-data.service';
import { UserStoreService } from '../../../services/user-store.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchForm!: FormGroup;
  role: any='';
  constructor(private photographerService: PhotographerService, private fb: FormBuilder, private route: Router, private filterService: PhotographerFilteredDataService, private customerService: CustomerService){

  }
  ngOnInit() : void{
    this.role=  this.customerService.getRoleFromToken()
    console.log("role", this.role);
    this.searchForm = this.fb.group({
        city:['', Validators.required]


    })
  }

  onSearch(){
    const formValue = this.searchForm.value;
    console.log("search", formValue)
    this.photographerService.getFilteredResults(formValue.city).subscribe({
      next: (res)=>{
        console.log("Res", res)
        this.filterService.setPhotographers(res);

        this.route.navigate(['/filteredResults'])

      },
      error: (err)=>{
        console.log("error: ", err);
      }



    })
  }
  navigateToDashboard(): void {
    if (this.role === 'Photographer') {
      this.route.navigate(['/photographerDashboard']);
    } else if (this.role === 'Customer') {
      this.route.navigate(['/customerDashboard']);
    } else {
      console.log("dashboard not found")
      console.log('Role:', this.role); 
    }
  }
}