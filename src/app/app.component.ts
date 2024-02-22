import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../app/core/pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { CustomerService } from './services/customer.service';
import { PhotographerService } from './services/photographer.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService } from './services/booking.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, FormsModule, ReactiveFormsModule, HttpClientModule, NavbarComponent, FooterComponent,
    
    MatSnackBarModule],
  providers: [CustomerService, PhotographerService,HttpClient,HttpClientModule, BookingService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private http: HttpClient) { };
  title = 'LenzPerson';
}
