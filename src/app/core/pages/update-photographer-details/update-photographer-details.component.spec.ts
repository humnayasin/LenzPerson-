import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotographerDetailsComponent } from './update-photographer-details.component';

describe('UpdatePhotographerDetailsComponent', () => {
  let component: UpdatePhotographerDetailsComponent;
  let fixture: ComponentFixture<UpdatePhotographerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePhotographerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePhotographerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
