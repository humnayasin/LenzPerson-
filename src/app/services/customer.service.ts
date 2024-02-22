import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDetail } from '../models/CustomerDetail';
import { login } from '../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { updatePassword } from '../models/updatePasswords';
import { updateCustomerDetails } from '../models/updateCustomerDetails';



@Injectable({
  providedIn: 'root'
})



export class CustomerService {


  userpayload: any; 

  

  private apiUrl= `https://localhost:7249/api/LenzPerson/register`;
  private loginUrl= `https://localhost:7249/api/LenzPerson/login`;
  private checkEmail= `https://localhost:7249/api/LenzPerson/isEmailExist`;
  private updateCust= `https://localhost:7249/api/LenzPerson/UpdateCustomerDetails`;
  private updatePasswordUrl=`https://localhost:7249/api/LenzPerson/UpdatePassword/`;



  constructor(private http: HttpClient) {
    console.log("in customer service now ");
    this.userpayload=this.decodeToken();
  }

  updateCustomer(model:updateCustomerDetails):Observable<any>{
    return this.http.put<void>(this.updateCust, model);
  }
  updatePassword(id: number, model: updatePassword): Observable<void> {
    const url = `${this.updatePasswordUrl}${id}`;
    return this.http.put<void>(url, model);
  }

  // to add new user
  addCustomer(model: CustomerDetail): Observable<void> {
    return this.http.post<void>(this.apiUrl, model); 
  }


  userLogin(model: login): Observable<any>{
    return this.http.post<any>(this.loginUrl,model);
  }
  setToken(token:string){
    localStorage.setItem("access_token", token)
  }

  isLoggedIn(){
    return localStorage.getItem("access_token")?  true : false;
  }
    removeToken(){
      try{

        localStorage.removeItem("access_token");
      }catch(err){
        console.log("unable to remove the token ", err);
        
      }

    
    }



  
    isEmailExists(email: string): Observable<boolean> {
      return this.http.post<boolean>(`${this.checkEmail}?email=${email}`, null);
    }
    


    getToken(){

        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem('access_token');
        } else {
       
          console.error('localStorage is not available in this environment');
          return null;
        }
      }


      decodeToken(){

          const JwtHelper =new JwtHelperService();
          const token = this.getToken()!;
          if(token){

            this.userpayload=  JwtHelper.decodeToken(token);
            console.log("token is decoded", JwtHelper.decodeToken(token))
            return JwtHelper.decodeToken(token);
          }

          return null;


      }

      getNameFromToken(){
          if(this.userpayload){
            return this.userpayload.firstName;
          }
      }
      getRoleFromToken(){
          if(this.userpayload){
            return this.userpayload.role;
          }
      }
      getEmailFromToken(){
        if(this.userpayload){
          return this.userpayload.email;
        }
      }
         getIdFromToken(){
        if(this.userpayload){
          return this.userpayload.id;
        }
      }
      
      getPayloadFromToken(){
        if(this.userpayload){
          return this.userpayload;
        }

      }
}
  
  

