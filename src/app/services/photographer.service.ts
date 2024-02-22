import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotographerDetails } from '../models/PhotographerDetails';
import { Observable } from 'rxjs';
import { updatePhotographerDetail } from '../models/updatePhotographerDetails';
import { feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {



  private registerUrl=" https://localhost:7249/api/Photographer/RegisterPhotographer";
  private url="https://localhost:7249/api/Photographer/GetAllPhotographers";
  private ImageUploadUrl="https://localhost:7249/api/Photographer/uploadImage";
  private getPhotographerUrl="https://localhost:7249/api/Photographer/GetPhotographer";
  private portFolioUploadUrl="https://localhost:7249/api/PhotographerAssets/UploadPortfolio";
  private uploadGalleryPhotosUrl = "https://localhost:7249/api/PhotographerAssets/UploadPhotoGallery";
  private getGalleryImagesUrl = "https://localhost:7249/api/PhotographerAssets/GetGalleryImages";
  private updatePhotographerUrl = "https://localhost:7249/api/Photographer/UpdatePhotographerDetails";
  private getPortfolioLinkUrl="https://localhost:7249/api/PhotographerAssets/GetPortfolioLinks";
  private getPById="https://localhost:7249/api/Photographer/GetPhotographerById";
  private getFeedback="https://localhost:7249/api/Booking/GetFeedback";
  private filteredResults = "https://localhost:7249/api/Photographer/getFilteredData"
  constructor(private http:HttpClient) { }

getFilteredResults(city:string):Observable<PhotographerDetails[]>{
  const url = `${this.filteredResults}?city=${city}`
  return this.http.get<PhotographerDetails[]>(url);
}
  
  
  getFeedbackByPid(photographerId: number):Observable<feedback[]>{
    const url=`${this.getFeedback}?PhotographerId=${photographerId}`
    return this.http.get<feedback[]>(url);
  }    
    //add new photographer

    addPhotographer(model:PhotographerDetails):Observable<void>{
          return this.http.post<void>(this.registerUrl, model);
  }

  updatePhotograher(model:updatePhotographerDetail):Observable<any>{
    return this.http.put<void>(this.updatePhotographerUrl, model);
  }

  getAllPhotographers():Observable<PhotographerDetails[]>{


      return this.http.get<PhotographerDetails[]>(this.url);

      
  }
  getPhotographer(email: string): Observable<PhotographerDetails> {
    const url = `${this.getPhotographerUrl}?email=${encodeURIComponent(email)}`;
    return this.http.get<PhotographerDetails>(url);
  }
    getPhotographerById(id: number): Observable<PhotographerDetails> {
    const url = `${this.getPById}?id=${id}`;
    return this.http.get<PhotographerDetails>(url);
  }




  uploadProfilePicture(file: File): Observable<void> {


 
    
    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);  
    return this.http.post<void>(this.ImageUploadUrl, formData);
  }

  uploadPortfolio(portfolio: File):Observable<string>{

    const formData: FormData = new FormData();
    formData.append('portfolio', portfolio, portfolio.name);
  


    return this.http.post<string>(this.portFolioUploadUrl, formData, {
      responseType: 'text' as 'json', 
    });
  }


  uploadGalleryPhotos(photos: File[]): Observable<string> {
    const formData: FormData = new FormData();
  
    for (let i = 0; i < photos.length; i++) {
      formData.append(`photoGallery`, photos[i], photos[i].name);
    }

    return this.http.post<string>(this.uploadGalleryPhotosUrl, formData);
  }
  
  
  
  

   getGalleryImages(id: number): Observable<string[]> {
    const url = `${this.getGalleryImagesUrl}?Id=${id}`;
    return this.http.get<string[]>(url);
  } 
   getPortfolioLinks(): Observable<string[]> {
  
    return this.http.get<string[]>(this.getPortfolioLinkUrl);
  }
}
