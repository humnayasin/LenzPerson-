import { inject, Injectable } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {




  const router = inject(Router);


  const token = localStorage.getItem("access_token")
  if(token){
    const JwtHelper =new JwtHelperService();
    
    const userpayload=  JwtHelper.decodeToken(token);
    const userRoles = userpayload.role;
     if (userRoles.includes('Customer')) {
      console.log("login successfully");
      return true;

    } else {
      router.navigate(['user/login']);
      return false;
    }
  } else {
    router.navigate(['user/login']);
    return false;
  }

};
