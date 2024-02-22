import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerSectionComponent } from './photographer-section.component';

describe('PhotographerSectionComponent', () => {
  let component: PhotographerSectionComponent;
  let fixture: ComponentFixture<PhotographerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographerSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
