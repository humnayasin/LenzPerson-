export class updateCustomerDetails{
    id: number;
    email: string;

    phoneNumber: string;
    firstName: string;
    lastName: string;
    gender: string;
    city: string;

   
  
    constructor(
      id: number,
      email: string,
   
      phoneNumber: string,
      firstName: string,
      lastName: string,
      gender: string,
      city: string,     
    ) {
      this.id = id;
      this.email = email;
    
      this.phoneNumber = phoneNumber;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.city = city;

    
    }
  }
  