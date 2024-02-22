import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerPortfolioComponent } from './photographer-portfolio.component';

describe('PhotographerPortfolioComponent', () => {
  let component: PhotographerPortfolioComponent;
  let fixture: ComponentFixture<PhotographerPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographerPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographerPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
