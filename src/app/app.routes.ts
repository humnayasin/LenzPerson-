import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './core/pages/register/register.component';
import { HomeComponent } from './core/pages/home/home.component';
import { SignInComponent } from './core/pages/sign-in/sign-in.component';
import { CustomerDashboardComponent } from './core/pages/customer-dashboard/customer-dashboard.component';
import { PhotographerRegisterComponent } from './core/pages/photographer-register/photographer-register.component';
import { authGuard } from './services/auth.guard';
import { PhotographerDashboardComponent } from './core/pages/photographer-dashboard/photographer-dashboard.component';
import { PhotographerPortfolioComponent } from './core/components/photographer-portfolio/photographer-portfolio.component';
import { UpdatePasswordFormComponent } from './core/pages/update-password-form/update-password-form.component';
import { PhotographerComponent } from './core/components/photographer/photographer.component';
import { FilteredResultsComponent } from './core/pages/filtered-results/filtered-results.component';
import { customerGuard } from './services/customer.guard';

export const routes: Routes = [
    {
      path: 'user/register',
      component: RegisterComponent,
    },
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'user/login',
      component: SignInComponent,
    }, 
    {
      path: 'photographer/register',
      component: PhotographerRegisterComponent,
    },

    {
      path: 'customerDashboard', 
      component: CustomerDashboardComponent,
      canActivate: [authGuard], 
    },
    {
      path: 'photographerDashboard', 
      component: PhotographerDashboardComponent,
      canActivate: [customerGuard], 
    },
    {
      path: 'portfolio', 
      component: PhotographerPortfolioComponent
     
    },
    {
      path: 'changePassword', 
      component: UpdatePasswordFormComponent
     
    },
    {
      path: 'filteredResults', 
      component: FilteredResultsComponent,
      canActivate: [authGuard],
    },

    
  ];
  