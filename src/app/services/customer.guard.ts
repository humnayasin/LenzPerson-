import { inject, Injectable } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



export const customerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("access_token")
  console.log("in customer guard")
  if(token){
    const JwtHelper =new JwtHelperService();
    
    const userpayload=  JwtHelper.decodeToken(token);
    const userRoles = userpayload.role;
     if (userRoles.includes('Photographer')) {
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
}


