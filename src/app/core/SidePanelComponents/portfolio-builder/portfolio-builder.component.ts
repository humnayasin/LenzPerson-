import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotographerService } from '../../../services/photographer.service';

@Component({
  selector: 'app-portfolio-builder',
  standalone: true,
  imports: [ FormsModule,ReactiveFormsModule],
  templateUrl: './portfolio-builder.component.html',
  styleUrl: './portfolio-builder.component.css'
})
export class PortfolioBuilderComponent {


  portfolioInput!: FormGroup;
  portfolioFile!:File;
  constructor(private fb: FormBuilder, private photographerService: PhotographerService) { }

  ngOnInit() {
    this.portfolioInput = this.fb.group({
      PortFolio: ['']
  });
  this.portfolioInput.get('PortFolio')?.valueChanges.subscribe((file: File) => {
    if (file) {
      this.portfolioFile = file;
      console.log('Selected File:', this.portfolioFile);
    }
  });

  }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.portfolioFile = files[0];
    }
  }
  uploadPortfolio() {
   
    if (this.portfolioFile) {

      this.photographerService.uploadPortfolio(this.portfolioFile).subscribe({

        
        
        next: ()=> {
          alert("file successfully uploaded")
          this.portfolioInput.reset()
          console.log('Portfolio uploaded successfully!');
        },
        error: (err) => {
          console.error('Error uploading portfolio:', err);
        }
      }
      );
    }
  }
}


