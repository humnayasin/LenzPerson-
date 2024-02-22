import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { login } from '../../../models/login';
import { CustomerService } from '../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from '../../../services/user-store.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlingService } from '../../../services/error-handling.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  model!: login;
  loginForm!: FormGroup;
  submitted = false;

  errorMessage: string | null = null;

  ngOnInit(): void {
    this.errorService.getErrorMessage().subscribe((message) => {
      this.errorMessage = message;
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userStore: UserStoreService,
    private errorService: ErrorHandlingService
  ) {
    this.model = new login('', '');
    this.submitted=false;
  }

  signIn() {
    
    const user = this.loginForm.value;
    this.submitted= true;
    if(this.loginForm.valid){

      this.model.email = user.email;
      this.model.password = user.password;
      console.log(this.model);
      
      this.customerService.userLogin(this.model).subscribe({
        next: (response) => {
          this.submitted= false;
          this.snackBar.open('Successfully Login!','Close',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-success',
            }
            );
          
        console.log(response.token);
        if (response.token) {
          this.customerService.setToken(response.token);
          const tokenPayload = this.customerService.decodeToken();
          this.userStore.setRoleFromStore(tokenPayload.firstName);
          this.userStore.setRoleFromStore(tokenPayload.role);
          if (this.customerService.getRoleFromToken() == 'Customer') {
            this.router.navigateByUrl('customerDashboard');
          } else if (
            this.customerService.getRoleFromToken() == 'Photographer'
            ) {
              this.router.navigateByUrl('photographerDashboard');
            } else {
              this.snackBar.open(
                'Dashboard not found in response',
                'Close',
                
                {
                  duration: 3000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: 'custom-snackbar-warning',
              }
            );
          }
        } else {
          this.snackBar.open(
            'Token not found in response',
            'Close',
            
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar-warning',
            }
            );
          }
        },
        error: (err) => {
        this.snackBar.open(
          'Error Occur during login',
          'Close',

          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: '.custom-snackbar-error',
          }
          );
        },
    
      });
    }else{
      this.snackBar.open('Invalid data Entered ','Close',{duration: 3000,horizontalPosition: 'end',verticalPosition: 'top',panelClass: '.custom-snackbar-error',} );
      
    }
  }
}
