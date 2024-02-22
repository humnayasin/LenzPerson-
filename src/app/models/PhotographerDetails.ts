export class PhotographerDetails {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: string;
    city: string;
    instaHandle: string;
    portfolioLink: string;
    cameraUsed: string;
    PreferredPhotoshootTypes: string[];
    UserRole: string;
    ProfilePicture: string = '';
    constructor() {

      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.phone = '';
      this.firstName = '';
      this.lastName = '';
      this.gender = '';
      this.city = '';
      this.instaHandle = '';
      this.portfolioLink = '';
      this.cameraUsed = '';
      this.PreferredPhotoshootTypes = [''];
      this.UserRole='';
      this.ProfilePicture="";
    }
  }
  