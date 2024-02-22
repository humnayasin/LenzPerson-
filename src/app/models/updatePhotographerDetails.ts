// Update the model to match backend expectations
export class updatePhotographerDetail {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  instaHandle: string;
  portfolioLink: string;
  cameraUsed: string;
  profilePicture: string = '';  

  constructor() {
    this.id=0;
    this.email = '';
    this.phoneNumber = '';
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.city = '';
    this.instaHandle = '';
    this.portfolioLink = '';
    this.cameraUsed = '';
    this.profilePicture = ''; 
  }
}
