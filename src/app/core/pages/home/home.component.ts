import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DetailSectionComponent } from '../../components/detail-section/detail-section.component';
import { PhotographerSectionComponent } from '../../components/photographer-section/photographer-section.component';
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CarouselComponent, DetailSectionComponent, PhotographerSectionComponent, GallerySectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
