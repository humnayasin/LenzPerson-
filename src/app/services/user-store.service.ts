import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

 private name$= new BehaviorSubject<string>("");
 private role$= new BehaviorSubject<string>("");
 private email$= new BehaviorSubject<string>("");


  constructor() { }

      public getRoleFromStore(){
        return this.role$.asObservable();}
      public getNameFromStore(){
        return this.name$.asObservable();}   

      public getEmailFromStore(){
        return this.email$.asObservable();}
      public setEamilFromStore(email:string ){
        this.email$.next(email);}  

      public setNameFromStore(name:string ){
        this.name$.next(name);}
      public setRoleFromStore(role: string ){
        this.role$.next(role) ;}

     



      
    
      

    }
  

