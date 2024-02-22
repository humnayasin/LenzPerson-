export class CustomerDetail {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    gender: string;
    city: string;
    userRole: string
   
  
    constructor(
      id: number,
      email: string,
      password: string,
      phoneNumber: string,
      firstName: string,
      lastName: string,
      gender: string,
      city: string,
      userRole: string
     
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.city = city;
      this.userRole =userRole;

    
    }
  }
  